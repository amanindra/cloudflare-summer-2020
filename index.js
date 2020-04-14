addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(
      new Request('https://cfw-takehome.developers.workers.dev/api/variants')
    )
  );
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return fetch(request)
    .then((response) => response.json())
    .then((responseData) => {
      let urls = [...responseData.variants];
      return urls;
    })
    .then((urls) => {
      let i = Math.random() >= 0.5 ? 1 : 0;
      return fetch(urls[i]);
    });
}
