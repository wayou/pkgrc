#!/usr/bin/env node

const run = require("./index");

const [, , ...args] = process.argv;

run(args[0]);
