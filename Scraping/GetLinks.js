// Function to fetch HTML content from a URL
async function fetchHTML(url) {
  const response = await fetch(url);
  const html = await response.text();
  return html;
}

const cheerio = require("cheerio");

// Function to extract links from HTML content
function extractLinks(html) {
  const $ = cheerio.load(html);
  const links = [];
  // Extract the href attribute from each link and add it to the links array only if it starts with "/title"
  $(".ipc-title-link-wrapper").each((i, link) => {
    const href = $(link).attr("href");
    if (href && href.startsWith("/title")) {
      links.push(href);
    }
  });
  return links;
}

// Main function to scrape links from a website
async function scrapeLinks() {
  const url = "https://m.imdb.com/chart/top/?genres=adventure"; // URL of the website you want to scrape
  const html = await fetchHTML(url);
  const links = extractLinks(html);
  console.log(links); // Output the list of links
  // Check if links is an array. If not, return an empty array.
  return Array.isArray(links) ? links : [];
}

module.exports = scrapeLinks;
