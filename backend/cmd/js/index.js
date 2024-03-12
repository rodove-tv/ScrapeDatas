const getLinks = require("./GetLinks.js");
const movieInfo = require("./MovieInfos.js");

async function index() {
  const links = await getLinks();
  console.log(links.length); // Log the length of the links array
  const movie = [];
  for (let i = 0; i < 250; i++) {
    console.log(links[i]); // Log the current link
    const info = await movieInfo(links[i]);
    console.log(info); // Log the returned info
    movie.push(info.toString());
  }

  fs.writeFile("./data/movies.json", JSON.stringify(movie), (err) => {
    if (err) throw err;
    console.log("File saved");
  });

  console.log(movie); // Log the movie array to the console
}

index();
