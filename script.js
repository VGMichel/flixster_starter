const API_KEY = '499529c269445690825b8102ff9bcad3'
const nowPlayingGrid = document.querySelector('#movies-grid')
const searchMoviesGrid = document.querySelector('#movies-grid-search')
const movieCard = document.querySelector('.movie-card')
const loadBtn = document.querySelector('#load-more-movies-btn')
const loadSearchBtn = document.querySelector('#load-more-movies-btn-search')
const movieSearchBtn = document.querySelector('#submit')
const sectionNowPlaying = document.querySelector('.now-playing')
const sectionSearch = document.querySelector('.search-movies')

let page = 1;
let emptySearch = ''

/////// NOW PLAYING ///////
async function loadNowPlaying (evt) {

    let apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`

    const response = await fetch(apiUrl)
    const responseData = await response.json()
    //console.log(responseData.results)

    displayMovies(responseData);

}

function loadMoreNowPlaying () {
    let searchInput = document.querySelector('#search').value

    if (searchInput == emptySearch){
        page++
        loadNowPlaying()
    }
}

function displayMovies (movieData) {
    const imgHTTP = 'https://www.themoviedb.org/t/p/w1280/';

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
/////// END NOW PLAYING ///////


/////// SEARCH RESULTS ///////

movieSearchBtn.addEventListener("click", searchMovies)
async function searchMovies(evt) {

    nowPlayingGrid.innerHTML = ``
    evt.preventDefault();
    let searchInput = document.querySelector('#search').value
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}&page=${page}`
    const searchResponse = await fetch(searchUrl)
    const searchResponseData = await searchResponse.json()

    console.log(searchInput)
    console.log(searchResponseData)

    displaySearch(searchResponseData)
}

function loadMoreSearch () {
    let searchInput = document.querySelector('#search').value
    
    if (searchInput != emptySearch){
        page++
        searchMovies()
    }
}

/*loadSearchBtn.addEventListener('click', () => {
    //console.log('Don\'t touch me')

})*/

function displaySearch (searchMovieData) {
    const imgHTTP = 'https://www.themoviedb.org/t/p/w1280/';

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

window.onload = function () {

    loadNowPlaying(nowPlayingGrid)

    loadBtn.addEventListener('click', () => {
        //console.log("I\'m being attacked")
        loadMoreNowPlaying()
    })

    loadBtn.addEventListener("click", (evt) => {
        evt.preventDefault()
        loadMoreSearch()
    })
}