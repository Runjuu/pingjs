// See LICENSE for usage information
// Thanks to https://github.com/jdfreder/pingjs

/**
 * Creates and loads an image element by url.
 * @param  {String} url
 * @param  {Number} timeout
 * @return {Promise} promise that resolves to an image element or
 *                   fails to an Error.
 */
const requestImage = (url, timeout) => (new Promise(function(resolve, reject) {
  const img = new Image();
  img.onload = resolve;
  img.onerror = reject;
  img.src = `${url}?random-no-cache=${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`;

  clearTimeout(requestImage.timeout);
  if (timeout) requestImage.timeout = setTimeout(() => reject(`Timeout after ${timeout} ms`), timeout);
}));

/**
 * Pings a url.
 * @param  {String} url
 * @param  {Number} timeout
 * @return {Promise} promise that resolves to a ping (ms, float).
 */
async function ping(url, timeout) {
  const start = (new Date()).getTime();

  try {
    await requestImage(url, timeout);
  } catch (err) {
    console.log(err);
  	throw err;
  }

  return (new Date()).getTime() - start;
}

export default ping;
