const spawn = require('cross-spawn-with-kill');
const waitOn = require('wait-on');
require('./env').config();

const port = 3000;