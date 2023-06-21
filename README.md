---
title: Template Node CTransformers Express
emoji: 🐍
colorFrom: yellow
colorTo: green
sdk: docker
pinned: false
app_port: 7860
---

A minimalist Docker space to help people getting started with Node, CTransformers (through Pythonia), Express and TypeScript.
Ready to be used in a Hugging Face Space.

## Installation

### Prerequisites

- Install NVM: https://github.com/nvm-sh/nvm
- Install Docker https://www.docker.com

### CTransformers

This projects relies on CTransformers called through Pythonia.



To install ctransformers:

```bash
pip install ctransformers
# or this, depending on your Python environment:
# pip3 install ctransformers
```

For GPU (CUDA) support set environment variable CT_CUBLAS=1 and install from source using:

```bash
CT_CUBLAS=1 pip install ctransformers --no-binary ctransformers
# or this, depending on your Python environment:
# CT_CUBLAS=1 pip3 install ctransformers --no-binary ctransformers
```

### Building and run without Docker

```bash
nvm use
npm i
npm run start
```

### Building and running with Docker

```bash
npm run docker
```

This script is a shortcut executing the following commands:

```bash
docker pull nikolaik/python-nodejs
docker build -t template-node-python-express .
docker run -it -p 7860:7860 template-node-python-express
```
