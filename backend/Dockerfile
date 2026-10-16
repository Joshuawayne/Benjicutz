# Use the official lightweight Deno Alpine image
FROM denoland/deno:alpine

# Set working directory
WORKDIR /app

# Copy all backend source code
COPY . .

# Cache dependencies and generate node_modules as root to avoid permission errors
RUN deno cache main.ts

# Ensure the unprivileged 'deno' user owns the working directory and node_modules
RUN chown -R deno:deno /app

# Switch to unprivileged 'deno' user for runtime security
USER deno

# Render exposes PORT dynamically (defaults to 10000)
ENV PORT=10000
EXPOSE 10000

# Start the Oak application
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"]
