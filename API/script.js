const genreInput = document.getElementById("genreInput");
const languageInput = document.getElementById("languageInput");
const recommendBtn = document.getElementById("recommendBtn");

const movieTitleEl = document.getElementById("movieTitle");
const moviePosterEl = document.getElementById("moviePoster");
const moviePlotEl = document.getElementById("moviePlot");
const movieRuntimeEl = document.getElementById("movieRuntime");
const movieBox = document.getElementById("movieBox");

function getSelectedDuration() {
  const radios = document.querySelectorAll('input[name="duration"]');
  for (const radio of radios) {
    if (radio.checked) return radio.value;
  }
  return "under2";
}

function runtimeMatches(runtimeText, category) {
  const match = runtimeText.match(/(\d+)/);
  if (!match) return false;
  const minutes = parseInt(match[1]);
  if (category === "under2") return minutes <= 120;
  if (category === "over2") return minutes > 120;
  return true;
}

async function fetchMovieList(keyword) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=b102b107&s=${keyword}`);
  const data = await res.json();
  return data.Search || [];
}

async function fetchMovieDetails(imdbID) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=b102b107&i=${imdbID}`);
  const data = await res.json();
  return data;
}

recommendBtn.addEventListener("click", async () => {
  const genre = genreInput.value.toLowerCase();
  const language = languageInput.value.toLowerCase();
  const durationCategory = getSelectedDuration();
  const keywords = [genre, "life", "love", "dream", "hero", "family"];

  movieTitleEl.textContent = "Searching for matching movie...";
  movieBox.style.display = "none";

  for (let tries = 0; tries < 10; tries++) {
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    const list = await fetchMovieList(keyword);

    for (const movie of list) {
      const detail = await fetchMovieDetails(movie.imdbID);
      const genreMatch = (detail.Genre || "").toLowerCase().includes(genre);
      const langMatch = (detail.Language || "").toLowerCase().includes(language);
      const timeMatch = runtimeMatches(detail.Runtime, durationCategory);

      if (genreMatch && langMatch && timeMatch) {
        movieBox.style.display = "block";
        movieTitleEl.textContent = `${detail.Title} (${detail.Year}) [${detail.Rated}]`;
        moviePosterEl.src = detail.Poster;
        moviePlotEl.textContent = detail.Plot;
        movieRuntimeEl.textContent = `Genre: ${detail.Genre} | Director: ${detail.Director} | Language: ${detail.Language} | Runtime: ${detail.Runtime}`;
        return;
      }
    }
  }

  movieTitleEl.textContent = "No matching movie found after multiple tries. Try different settings.";
});
