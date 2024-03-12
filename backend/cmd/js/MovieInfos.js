const puppeteer = require('puppeteer');
const fs = require('fs');

async function run(link) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Utilisez un en-tête User-Agent personnalisé
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto('https://www.imdb.com'+link);
        const movies = await page.evaluate(() => 
            Array.from(document.querySelectorAll('.ipc-page-section ipc-page-section--baseAlt ipc-page-section--tp-none ipc-page-section--bp-xs sc-491663c0-2 eGWcuq'), (e) => {
                const titleElement = e.querySelector('.hero__primary-text');
                const yearElement = e.querySelector('.ipc-link ipc-link--baseAlt ipc-link--inherit-color');
                const dureeElement = e.querySelector('.ipc-inline-list__item');
                const ratingElement = e.querySelector('.ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link');
                
                return {
                    title: titleElement ? titleElement.innerText.trim() : null,
                    year: yearElement ? yearElement.innerText.trim() : null,
                    duree: dureeElement ? dureeElement.innerText.trim() : null,
                    pegi: ratingElement ? ratingElement.innerText.trim() : null,
                };
            })
        );

        movies.forEach(movie => console.log(movie.title));


        fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
          if (err) {
            console.error('An error occurred:', err);
          } else {
            console.log("File saved");
          }
        });

        await browser.close();
    } catch (error) {
        console.error('Error occurred:', error); // Log any errors that occur
    }

}


module.exports = run;