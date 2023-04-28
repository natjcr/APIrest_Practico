axios.get('');

const api = axios.create({
    beseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    },
});

//UTILS

function createMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {  
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);
    
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container) {
    container.innerHTML = '';

    categories.forEach(category => {      
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);
    
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

// LLamados a la API

async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;
    console.log(movies);

    createMovies(movies, trendingMoviesPreviewList);
}


async function getCategoriesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();

    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
    const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY, {
        params: {
            with_genres: id,
        },
    });
    const data = await res.json();

    const movies = data.results;

    createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
    const res = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY, {
        params: {
            query,
        },
    });
    const data = await res.json();

    const movies = data.results;

    createMovies(movies, genericSection);
}
async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w300' + movie.poster_path;
    console.log(movieImgUrl)
    headerSection.style.background = `url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.movie_average;
    
    createCategories(movie.genres, movieDetailCategoriesList);
}