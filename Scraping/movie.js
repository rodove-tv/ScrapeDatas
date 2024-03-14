const puppeteer = require("puppeteer");

async function run(link) {
  let movies = [];
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (typeof link === "string") {
      await page.goto("https://www.imdb.com" + link);
      movies = [];
    } else {
      console.error("Invalid link:", link);
    }
    // Utilisez un en-tête User-Agent personnalisé
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto("https://www.imdb.com" + link);

    movies = await page.evaluate((link) => {
      function extractrating(link) {
        var the_string = link;
        var parts = the_string.split("t_", 2);
        rating = parts[1];
        return rating;
      }
      const e = document.querySelector(".sc-304f99f6-0");
      const titleElement = e.querySelector(".sc-d8941411-0");
      const yearElement = e.querySelector(".sc-d8941411-2 li:first-child");
      const dureeElement = e.querySelector(".sc-d8941411-2 li:nth-child(3)");
      const ratingElement = extractrating(link);
      const realElement = spaceBeforeUpper(
        e.querySelector(
          "ul:first-child .ipc-metadata-list-item__list-content-item"
        )
      );
      const actorsElement = e.querySelector(
        "ul .ipc-metadata-list-item--link .ipc-metadata-list-item__content-container"
      );
      const classementElement = e.querySelector(".sc-5f7fb5b4-1");
      const synopElement = e.querySelector(".sc-466bb6c-2");

      return {
        Order:
          ratingElement && typeof ratingElement === "string"
            ? ratingElement.trim()
            : null,
        Title: titleElement ? titleElement.innerText.trim() : null,
        Year: yearElement ? yearElement.innerText.trim() : null,
        Duration: dureeElement ? dureeElement.innerText.trim() : null,

        Real: realElement ? realElement.innerText.trim() : null,
        Actors: actorsElement ? actorsElement.innerText.trim() : null,
        IMDBclassement: classementElement
          ? classementElement.innerText.trim()
          : null,
        Synop: synopElement ? synopElement.innerText.trim() : null,
      };
    }, link);

    console.log(movies); // Output the extracted movie data

    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error); // Log any errors that occur
  }
  return movies;
}

module.exports = {
  run,
};

/*
//func which add space before upper case, exept if the char before is a space or a dot
function spaceBeforeUpper(str) {
  if (str === null) {
    return null;
  }
  var myString = "MySites";
  var newString = "";
  var wasUpper = false;
  for (var i = 0; i < myString.length; i++) {
    if (
      !wasUpper &&
      myString[i] == myString.toUpperCase()[i] &&
      myString[i - 1] != " " &&
      myString[i - 1] != "."
    ) {
      newString = newString + " ";
      wasUpper = true;
    } else {
      wasUpper = false;
    }
    newString = newString + myString[i];
  }
  return newString;
}
*/
