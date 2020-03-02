#!/usr/bin/env node

import 'reflect-metadata';

import { CLI } from './src/cli';

async function bootstrap() {
  const app = new CLI();

  await app.main();
}

bootstrap();