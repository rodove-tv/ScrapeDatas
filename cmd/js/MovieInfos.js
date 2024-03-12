const puppeteer = require("puppeteer");
const fs = require("fs");

async function run(links) {
  let movies; // Declare movies here
  try {
    const browser = await puppeteer.launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    });
    const page = await browser.newPage();

    for (let link of links) {
      const page = await browser.newPage();

      // Set a custom User-Agent header
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );

      // Go to the IMDB page
      await page.goto("https://www.imdb.com/" + link);

      movies = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(".ipc-metadata-list-summary-item__tc"),
          (e) => {
            const titleElement = e.querySelector(".hero__primary-text");
            const yearElement = e.querySelector(
              ".ipc-link ipc-link--baseAlt ipc-link--inherit-color"
            );
            const dureeElement = e.querySelector(".ipc-inline-list__item");
            const ratingElement = e.querySelector(".sc-bde20123-1 cMEQkK");

            return {
              title: titleElement ? titleElement.innerText.trim() : null,
              year: yearElement ? yearElement.innerText.trim() : null,
              duree: dureeElement ? dureeElement.innerText.trim() : null,
              pegi: ratingElement ? ratingElement.innerText.trim() : null,
            };
          }
        )
      );
    }
    // Now you can use 'movies' here
    console.log(movies);

    await page.close();

    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error); // Log any errors that occur
  }
  return movies;
}

module.exports = run;
/*
const puppeteer = require("puppeteer");

async function processLinks(links) {
  const browser = await puppeteer.launch();

  for (let link of links) {
    const page = await browser.newPage();
    await page.goto(link);
    // Process the page...
    await page.close();
  }

  await browser.close();
}
*/
