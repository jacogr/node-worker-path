const { parentPort, Worker } = require('worker_threads');

module.exports = function add (a, b) {
  const worker = new Worker('./worker.js');
  const result = new Int32Array(new SharedArrayBuffer(8));

  console.log('sending request :', a, '+', b);

  worker.postMessage({ a, b, result });
  Atomics.wait(result, 0, 0, 5000);
  worker.terminate();

  console.log('received result =', result[0]);

  return result[0];
}
