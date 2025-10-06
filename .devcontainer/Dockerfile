
FROM mcr.microsoft.com/devcontainers/javascript-node:20 as base

ENV NODE_ENV=development

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get -y install --no-install-recommends \
    curl tzdata ffmpeg && \
    rm -rf /var/lib/apt/lists/*