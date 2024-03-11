const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Utilisez un en-tête User-Agent personnalisé
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto('https://www.imdb.com/chart/top/?ref_=nv_mv_250');

        const movies = await page.evaluate(() => 
            Array.from(document.querySelectorAll('.ipc-metadata-list-summary-item__tc'), (e) => {
                const titleElement = e.querySelector('.ipc-title');
                const yearElement = e.querySelector('.cli-title-metadata-item:first-child');
                const dureeElement = e.querySelector('.cli-title-metadata-item:nth-child(2)');
                const ratingElement = e.querySelector('.cli-title-metadata-item:nth-child(3)');

                return {
                    title: titleElement ? titleElement.innerText.trim() : null,
                    year: yearElement ? yearElement.innerText.trim() : null,
                    duree: dureeElement ? dureeElement.innerText.trim() : null,
                    pegi: ratingElement ? ratingElement.innerText.trim() : null,
                };
            })
        );

        console.log(movies); // Output the extracted movie data

        fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
          if (err) throw err;
          console.log("File saved");
        });

        await browser.close();
    } catch (error) {
        console.error('Error occurred:', error); // Log any errors that occur
    }
    
}

run();
