parentPort.on('message', ({ a, b, result }) => {
  setTimeout(() => {
    result[0] = a + b;

    Atomics.wake(result, 0, 1);
  }, 1000);
});
