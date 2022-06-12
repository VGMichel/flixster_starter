const API_KEY = '499529c269445690825b8102ff9bcad3'
const nowPlayingGrid = document.querySelector('#movies-grid')
const searchMoviesGrid = document.querySelector('#movies-grid-search')
const movieCard = document.querySelector('.movie-card')
const loadBtn = document.querySelector('#load-more-movies-btn')
const loadSearchBtn = document.querySelector('#load-more-movies-btn-search')
const searchBtn = document.querySelector('#submit')
const clearSearchBtn = document.querySelector('#clear')
const sectionNowPlaying = document.querySelector('.now-playing')
const sectionSearch = document.querySelector('.search-movies')
const imgHTTP = 'https://www.themoviedb.org/t/p/w1280/';

let searchInput = document.querySelector('#search-input').value
let page = 1;
let emptySearch = ''


/////// MOVIES NOW PLAYING ///////
async function loadNowPlaying () {

    let apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`

    const response = await fetch(apiUrl)
    const responseData = await response.json()
    //console.log(responseData.results)

    displayMovies(responseData);

}

function loadMoreNowPlaying () {
    let searchInput = document.querySelector('#search-input').value

    if (searchInput == emptySearch){
        page++
        loadNowPlaying()
    }
}

function displayMovies (movieData) {

    movieData.results.forEach(function(i) {
        //console.log(i.title)
        nowPlayingGrid.innerHTML += `
        <div class="movie-card">
            <img src="${imgHTTP}${i.poster_path}">
            <div class="info">
            <p class="vote-average">&#9733; Rating: ${i.vote_average} / 10</p>
            <p class="movie-title">${i.title}</p>
            </div>
        </di>
        `
    })
}

    loadBtn.addEventListener('click', () => {
        loadMoreNowPlaying()
    })
/////// END MOVIES NOW PLAYING ///////



/////// MOVIE SEARCH RESULTS ///////

async function searchMovies() {

    nowPlayingGrid.innerHTML = ``
    let searchInput = document.querySelector('#search-input').value
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${page}&query=${searchInput}`

    const searchResponse = await fetch(searchUrl)
    const searchResponseData = await searchResponse.json()

    console.log(searchInput)
    console.log(searchResponseData)

    displaySearch(searchResponseData)
}

function displaySearch (searchMovieData) {

    searchMovieData.results.forEach(function(x) {
        searchMoviesGrid.innerHTML += `
        <div class="movie-card">
            <img src="${imgHTTP}${x.poster_path}">
            <div class="info">
            <p class="vote-average">&#9733; Rating: ${x.vote_average} / 10</p>
            <p class="movie-title">${x.title}</p>
            </div>
        </div>
        `
    })

}

function clearSearch() {
    page = 1
    searchMoviesGrid.innerHTML = ``
}

loadSearchBtn.addEventListener("click", (evt) => {
    evt.preventDefault()
    page++
    searchMovies()
})

searchBtn.addEventListener("click", (evt) => {
    evt.preventDefault()
    sectionSearch.classList.remove('hidden')
    sectionNowPlaying.classList.add('hidden')
    clearSearch()
    searchMovies()
})
/////// END MOVIE SEARCH RESULTS ///////



/////// WINDOW ONLOAD ///////
window.onload = function () {

    loadNowPlaying(nowPlayingGrid)

}