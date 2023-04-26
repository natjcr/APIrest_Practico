const API = `https://api.themoviedb.org/3/movie/550?api_key=548b0c6826fd1490a6918d5c4c174eb9`;
const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

async function getTrendingMoviesPreview() {
    const res = await fetch(API);
    const data = await res.json();

    const movies = data.results;
    movies.forEach(movie => {     

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    
    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}
getTrendingMoviesPreview();
