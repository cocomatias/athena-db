/**
 * Wraps a Promise with a timeout, aborting it if it takes longer than the specified time.
 * @param promise The Promise to be wrapped.
 * @param timeoutMs The maximum time to wait before aborting the Promise (in milliseconds).
 * @returns A Promise that either resolves/rejects with the original Promise's value or rejects with a timeout error.
 */
const abortablePromise = <T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> => {
  // A new Promise that rejects after timeoutMs milliseconds
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(new Error(`Promise timed out after ${timeoutMs} milliseconds`));
    }, timeoutMs);
  });

  // Clearing the timeout if the original promise settles
  const p = promise.then(
    (res) => {
      clearTimeout(timeoutHandle);
      return res;
    },
    (err) => {
      clearTimeout(timeoutHandle);
      throw err;
    },
  );

  // Using Promise.race to create a race condition between the original promise and the timeout
  return Promise.race([p, timeoutPromise]);
};

export default abortablePromise;
