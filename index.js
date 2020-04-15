/**
 * @author Manindra Kumar Anantaneni
 * Cloudflare Summer Internship 2020
 */

class LinkElementHandler {
  element(element) {
    element.setAttribute('href', 'https://amanindra.github.io');
    element.setInnerContent("Manindra Kumar Anantaneni's Github Pages");
  }
}

class TitleElementHandler {
  element(element) {
    element.before('<meta charset="utf-8">', { html: true });
    element.prepend('Welcome! Visiting ');
  }
}

class BodyElementHandler {
  element(element) {
    element.setInnerContent(
      'Summer 2020 Internship Coding Challenge by CloudFlare, done by Manindra Kumar Anantaneni'
    );
  }
}

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
  let response = await fetch(request)
    .then((response) => response.json())
    .then((responseData) => {
      let urls = [...responseData.variants];
      return urls;
    })
    .then((urls) => {
      let i = Math.random() >= 0.5 ? 1 : 0;
      return fetch(urls[i]);
    });

  let htmlRewrtiter = new HTMLRewriter()
    .on('p#description', new BodyElementHandler())
    .on('title', new TitleElementHandler())
    .on('a#url', new LinkElementHandler());

  return new Response(htmlRewrtiter.transform(response).body, response);
}
