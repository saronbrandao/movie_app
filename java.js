//GENERAL VARIABLES
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

//API VARIABLES
const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8d9871ba48a0b98e7eca6525a75a97a9&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=8d9871ba48a0b98e7eca6525a75a97a9&query="';

//**FUNCTIONS**/

//**utility function**//

const getClassByRate = (vote) => {
  if (vote >= 8) return 'green';
  if (vote >= 5) return 'orange';
  if (vote < 5) return 'red';
};

const showMovies = (movies) => {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
  `;

    main.appendChild(movieEl);
  });
};

//get initinal movies
const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
};

// getMovies(API_URL);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (search && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
