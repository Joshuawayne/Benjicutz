# Use the official lightweight Deno Alpine image
FROM denoland/deno:alpine

# Set working directory
WORKDIR /app

# Run as the unprivileged 'deno' user for security
USER deno

# Copy project metadata & lockfile first for layer caching
COPY --chown=deno:deno deno.json deno.lock* ./

# Copy the rest of the backend codebase
COPY --chown=deno:deno . .

# Pre-cache dependencies and compile main entrypoint
RUN deno cache main.ts

# Render exposes PORT dynamically (defaults to 10000)
ENV PORT=10000
EXPOSE 10000

# Start the Oak application
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
