'use strict';

const crowbarTypeGenerator = require('..');
const assert = require('assert').strict;

assert.strictEqual(crowbarTypeGenerator(), 'Hello from crowbarTypeGenerator');
console.info('crowbarTypeGenerator tests passed');
