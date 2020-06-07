const findMovies = (query) =>
    fetch("https://api.trakt.tv/search/movie?query=" + query, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'trakt-api-version': 2,
            'trakt-api-key': 'bc999a4f47069a533f0c8820ec7897e5d5ef6395c977b5935a52d3a2b013a600'
        }
    })
        .then(response => response.json())

const findSeries = (query) =>
    fetch("https://api.trakt.tv/search/show?query=" + query, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'trakt-api-version': 2,
            'trakt-api-key': 'bc999a4f47069a533f0c8820ec7897e5d5ef6395c977b5935a52d3a2b013a600'
        }
    })
        .then(response => response.json())

const getIMDBDetails = (imdbId) =>
    fetch(`https://api.themoviedb.org/3/find/${imdbId}?api_key=54fa45f317f011fa4fd57c4d1840485c&language=en-US&external_source=imdb_id`)
        .then(response => response.json())

export default {
    findMovies,
    findSeries,
    getIMDBDetails
}