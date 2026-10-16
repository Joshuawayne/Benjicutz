export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const backendBase = (
    config.denoBackendUrl ||
    process.env.DENO_BACKEND_URL ||
    "http://localhost:8000"
  ).replace(/\/+$/, "");

  // event.path contains the entire incoming path + query string (e.g. /api/v1/admin/analytics)
  const target = `${backendBase}${event.path}`;

  return proxyRequest(event, target);
});
