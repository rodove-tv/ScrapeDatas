const getLinks = require("./GetLinks.js");
const movieInfo = require("./MovieInfos.js");

async function index() {
  const links = await getLinks();
  const movie = [];
  for (let i = 0; i < 250; i++) {
    const info = await movieInfo(links[i]);
    movie.push(info);
  }
  console.log(movie); // Log the movie array to the console
}

index();
