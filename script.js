const API_KEY = '499529c269445690825b8102ff9bcad3'
const moviesGrid = document.querySelector('#movies-grid')
const movieCard = document.querySelector('.movie-card')
const loadBtn = document.querySelector('.load-btn')
let page = 1;

async function loadMoviesPage (evt) {
    //evt.preventDefault();

    let apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`

    const response = await fetch(apiUrl)

    const responseData = await response.json()

    console.log(apiUrl)
    console.log('The response is ' + response)
    console.log('The responseData ' + responseData)

    //console.log(responseData.results[3])
    displayMovies(responseData);

    //console.log(responseData.results[3].poster_path)
    //console.log(responseData.results[3].title)
}

function displayMovies (movieData) {
    ///movie/{movie_id}/images

    const imgHTTP = 'https://www.themoviedb.org/t/p/w1280/';

    movieData.results.forEach(function(i) {
        moviesGrid.innerHTML += `
        <div class="movie-card">
            <img src="${imgHTTP}${i.poster_path}">
            <p class="vote-count">${i.vote_average}</p>
            <p class="movie-title">${i.title}</p>
        </di>
        `
    })

}






window.onload = function () {

loadMoviesPage(moviesGrid)
}