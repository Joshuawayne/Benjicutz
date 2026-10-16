<template>
  <div
    ref="containerRef"
    class="elastic-line-container"
    :style="{ height: height + 'px' }"
    role="presentation"
    aria-hidden="true"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <svg
      :width="svgWidth"
      :height="height"
      class="elastic-line-svg"
      preserveAspectRatio="none"
    >
      <!-- Shadow / depth line -->
      <path
        :d="shadowPathD"
        fill="none"
        :stroke="shadowColor"
        :stroke-width="strokeWidth + 1.5"
        stroke-linecap="round"
        class="elastic-shadow"
      />
      <!-- Main elastic line -->
      <path
        :d="pathD"
        fill="none"
        :stroke="currentStroke"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        class="elastic-path"
      />
      <!-- Glow dot at the grab point -->
      <circle
        v-if="isGrabbed"
        :cx="displayQ.x"
        :cy="displayQ.y"
        :r="6"
        :fill="glowColor"
        class="elastic-glow"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  height?: number
  strokeWidth?: number
  lineColor?: string
  shadowColor?: string
  glowColor?: string
  grabbedColor?: string
  /** Distance from the line before it "grabs" onto the cursor (px) */
  grabThreshold?: number
  /** Distance the cursor must move from center before the line releases (px) */
  releaseThreshold?: number
  /** Spring stiffness — higher = faster snap back */
  stiffness?: number
  /** Spring damping — lower = more wobble oscillations */
  damping?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 80,
  strokeWidth: 1.5,
  lineColor: 'rgba(20, 18, 16, 0.3)',
  shadowColor: 'rgba(20, 18, 16, 0.06)',
  glowColor: 'rgba(212, 175, 55, 0.3)',
  grabbedColor: 'rgba(20, 18, 16, 0.45)',
  grabThreshold: 30,
  releaseThreshold: 120,
  stiffness: 300,
  damping: 6,
})

const containerRef = ref<HTMLElement | null>(null)
const svgWidth = ref(800)

// The rest position of the control point Q is the center of the SVG
const restQ = computed(() => ({
  x: svgWidth.value / 2,
  y: props.height / 2,
}))

// The current (animated) position of the control point
const displayQ = reactive({ x: 0, y: 0 })

// Is the cursor currently "grabbing" the line?
const isGrabbed = ref(false)

// Spring simulation state
let springVx = 0
let springVy = 0
let targetQ = { x: 0, y: 0 }
let animating = false
let rafId: number | null = null

// Track mouse position
let mouseX = 0
let mouseY = 0
let mouseInside = false

// SVG path: quadratic bezier — M start Q control end
const pathD = computed(() => {
  const startX = 0
  const startY = props.height / 2
  const endX = svgWidth.value
  const endY = props.height / 2
  return `M ${startX},${startY} Q ${displayQ.x},${displayQ.y} ${endX},${endY}`
})

const shadowPathD = computed(() => {
  const startX = 0
  const startY = props.height / 2
  const endX = svgWidth.value
  const endY = props.height / 2
  return `M ${startX},${startY + 2} Q ${displayQ.x},${displayQ.y + 2} ${endX},${endY + 2}`
})

const currentStroke = computed(() =>
  isGrabbed.value ? props.grabbedColor : props.lineColor
)

/**
 * Calculate the shortest distance from a point to the quadratic bezier.
 * We approximate by sampling points along the curve.
 */
function distanceToLine(px: number, py: number): number {
  const midY = props.height / 2
  const qx = displayQ.x
  const qy = displayQ.y
  const w = svgWidth.value

  let minDist = Infinity
  const steps = 40
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    // Quadratic bezier: B(t) = (1-t)²·P0 + 2(1-t)t·Q + t²·P1
    const bx = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * qx + t * t * w
    const by = (1 - t) * (1 - t) * midY + 2 * (1 - t) * t * qy + t * t * midY
    const dx = px - bx
    const dy = py - by
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < minDist) minDist = dist
  }
  return minDist
}

function onPointerMove(e: PointerEvent) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  mouseInside = true

  const distFromCenter = Math.sqrt(
    (mouseX - restQ.value.x) ** 2 + (mouseY - restQ.value.y) ** 2
  )

  if (!isGrabbed.value) {
    // Check if cursor is close enough to the line to grab it
    const dist = distanceToLine(mouseX, mouseY)
    if (dist < props.grabThreshold) {
      isGrabbed.value = true
    }
  }

  if (isGrabbed.value) {
    if (distFromCenter > props.releaseThreshold) {
      // Release — spring back to center
      release()
    } else {
      // Follow cursor directly while grabbed
      targetQ.x = mouseX
      targetQ.y = mouseY
      displayQ.x = mouseX
      displayQ.y = mouseY
      // Reset velocity so spring starts fresh on release
      springVx = 0
      springVy = 0
    }
  }
}

function onPointerLeave() {
  mouseInside = false
  if (isGrabbed.value) {
    release()
  }
}

function release() {
  isGrabbed.value = false
  // Target is center — spring will animate back
  targetQ.x = restQ.value.x
  targetQ.y = restQ.value.y
  // Start spring animation if not already running
  if (!animating) {
    animating = true
    rafId = requestAnimationFrame(springAnimate)
  }
}

/**
 * Spring physics animation loop.
 * Uses the classic spring equation: F = -k·x - c·v
 * where k = stiffness, c = damping coefficient
 * This naturally produces overshoot and wobble when damping is low.
 */
let lastTime = 0

function springAnimate(timestamp: number) {
  if (!lastTime) lastTime = timestamp
  // Use a fixed timestep for deterministic physics
  const dt = Math.min((timestamp - lastTime) / 1000, 0.033) // cap at ~30fps worth of dt
  lastTime = timestamp

  if (isGrabbed.value) {
    // Cursor recaptured the line — stop spring, follow cursor
    animating = false
    lastTime = 0
    return
  }

  const k = props.stiffness
  const c = props.damping

  // Spring force X
  const dxFromRest = displayQ.x - restQ.value.x
  const forceX = -k * dxFromRest - c * springVx
  springVx += forceX * dt
  displayQ.x += springVx * dt

  // Spring force Y
  const dyFromRest = displayQ.y - restQ.value.y
  const forceY = -k * dyFromRest - c * springVy
  springVy += forceY * dt
  displayQ.y += springVy * dt

  // Check if settled (both displacement and velocity are tiny)
  const totalDisplacement = Math.abs(dxFromRest) + Math.abs(dyFromRest)
  const totalVelocity = Math.abs(springVx) + Math.abs(springVy)

  if (totalDisplacement < 0.1 && totalVelocity < 0.1) {
    // Snap to rest
    displayQ.x = restQ.value.x
    displayQ.y = restQ.value.y
    springVx = 0
    springVy = 0
    animating = false
    lastTime = 0
    return
  }

  rafId = requestAnimationFrame(springAnimate)
}

function measureWidth() {
  if (containerRef.value) {
    svgWidth.value = containerRef.value.offsetWidth
    // Reset Q to center
    displayQ.x = svgWidth.value / 2
    displayQ.y = props.height / 2
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  measureWidth()

  resizeObserver = new ResizeObserver(() => {
    measureWidth()
  })
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<style scoped>
.elastic-line-container {
  position: relative;
  width: 100%;
  cursor: default;
  overflow: visible;
  z-index: 1;
  touch-action: none;
}

.elastic-line-svg {
  display: block;
  overflow: visible;
}

.elastic-path {
  transition: stroke 0.2s ease;
}

.elastic-shadow {
  filter: blur(4px);
}

.elastic-glow {
  filter: blur(6px);
  pointer-events: none;
  transition: opacity 0.15s ease;
}
</style>
