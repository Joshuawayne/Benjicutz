import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = path.join(process.env.TEMP, 'chrome-test-' + Date.now());

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9333',
  '--no-first-run',
  '--no-default-browser-check',
  `--user-data-dir=${userDataDir}`,
  'about:blank'
]);

async function main() {
  let versionData = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9333/json/version');
      versionData = await res.json();
      break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  if (!versionData) {
    console.error('Failed to connect to Chrome CDP');
    chrome.kill();
    return;
  }

  const listRes = await fetch('http://127.0.0.1:9333/json/list');
  const tabs = await listRes.json();
  const tab = tabs.find(t => t.type === 'page') || tabs[0];
  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  let id = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const resolve = pending.get(msg.id);
      pending.delete(msg.id);
      resolve(msg);
    }
  };

  await new Promise((r) => (ws.onopen = r));

  function send(method, params = {}) {
    const msgId = id++;
    return new Promise((resolve) => {
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: false,
    screenOrientation: { angle: 0, type: 'portraitPrimary' }
  });

  await send('Page.navigate', { url: 'http://localhost:3000/' });

  // Wait for network idle & hydration
  await new Promise(r => setTimeout(r, 4000));

  const pageInfo = await send('Runtime.evaluate', {
    expression: '({ href: location.href, title: document.title, bodyLength: document.body ? document.body.innerHTML.length : 0, h1: document.querySelector("h1") ? document.querySelector("h1").innerText : null })',
    returnByValue: true
  });
  console.log('Page info:', pageInfo.result?.result?.value);

  async function measure(width, height) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: width,
      height: height,
      deviceScaleFactor: 1,
      mobile: false,
      screenOrientation: {
        angle: 0,
        type: width < height ? 'portraitPrimary' : 'landscapePrimary'
      }
    });

    await new Promise(r => setTimeout(r, 1000));

    const evalResult = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const iw = window.innerWidth;
          const ih = window.innerHeight;
          const sw = document.documentElement.scrollWidth;
          const h1 = document.querySelector('h1');
          const h1Rect = h1 ? h1.getBoundingClientRect() : null;
          const h1Style = h1 ? window.getComputedStyle(h1) : null;
          
          const heroSection = document.querySelector('section');
          const sectionRect = heroSection ? heroSection.getBoundingClientRect() : null;
          const sectionStyle = heroSection ? window.getComputedStyle(heroSection) : null;
          
          const portraitFrame = document.querySelector('.hero-card-right');
          const portraitRect = portraitFrame ? portraitFrame.getBoundingClientRect() : null;
          const portraitStyle = portraitFrame ? window.getComputedStyle(portraitFrame) : null;
          
          const leftCol = document.querySelector('.hidden.lg\\\\:block');
          const leftStyle = leftCol ? window.getComputedStyle(leftCol) : null;
          
          const h1Count = document.querySelectorAll('h1').length;
          
          const cta = document.querySelector('.hero-magnetic-btn');
          const ctaRect = cta ? cta.getBoundingClientRect() : null;

          return {
            innerWidth: iw,
            innerHeight: ih,
            scrollWidth: sw,
            noHorizontalOverflow: sw <= iw,
            h1CountInHero: h1Count,
            h1: {
              text: h1 ? h1.innerText.replace(/\\s+/g, ' ').trim() : null,
              display: h1Style ? h1Style.display : null,
              width: h1Rect ? Math.round(h1Rect.width * 100) / 100 : null,
              height: h1Rect ? Math.round(h1Rect.height * 100) / 100 : null,
              top: h1Rect ? Math.round(h1Rect.top * 100) / 100 : null,
              bottom: h1Rect ? Math.round(h1Rect.bottom * 100) / 100 : null,
            },
            cta: {
              top: ctaRect ? Math.round(ctaRect.top * 100) / 100 : null,
              bottom: ctaRect ? Math.round(ctaRect.bottom * 100) / 100 : null,
              visible: ctaRect ? ctaRect.height > 0 : false
            },
            section: {
              display: sectionStyle ? sectionStyle.display : null,
              width: sectionRect ? Math.round(sectionRect.width * 100) / 100 : null,
            },
            portraitFrame: {
              display: portraitStyle ? portraitStyle.display : null,
              width: portraitRect ? Math.round(portraitRect.width * 100) / 100 : null,
              height: portraitRect ? Math.round(portraitRect.height * 100) / 100 : null,
              top: portraitRect ? Math.round(portraitRect.top * 100) / 100 : null,
              bottom: portraitRect ? Math.round(portraitRect.bottom * 100) / 100 : null,
            },
            leftColumn: {
              display: leftStyle ? leftStyle.display : null,
            }
          };
        })()
      `,
      returnByValue: true
    });

    if (evalResult.error) {
      console.error('Eval error:', evalResult.error);
    }
    if (evalResult.result && evalResult.result.exceptionDetails) {
      console.error('Exception in page:', evalResult.result.exceptionDetails);
    }

    return evalResult.result?.result?.value;
  }

  const mobileMetrics = await measure(390, 844);
  const desktopMetrics = await measure(1280, 800);

  console.log('=== MOBILE_METRICS_START ===');
  console.log(JSON.stringify(mobileMetrics, null, 2));
  console.log('=== MOBILE_METRICS_END ===');

  console.log('=== DESKTOP_METRICS_START ===');
  console.log(JSON.stringify(desktopMetrics, null, 2));
  console.log('=== DESKTOP_METRICS_END ===');

  ws.close();
  chrome.kill();
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {}
}

main().catch(err => {
  console.error(err);
  chrome.kill();
});
