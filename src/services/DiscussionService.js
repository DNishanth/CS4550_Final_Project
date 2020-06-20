export const findPostsForDiscussion = (showId) =>
  // fetch(`http://localhost:8080/api/discussions/${showId}`)
  fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions/${showId}`)
    .then(response => response.json())

export const createPost = (showId, post) =>
  // fetch(`http://localhost:8080/api/discussions/${showId}/posts`, {
  fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions/${showId}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const createShowDiscussion = (show) =>
  // fetch(`http://localhost:8080/api/discussions`, {
  fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions`, {
    method: 'POST',
    body: JSON.stringify(show),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const findShowByImdb = (imdb) =>
  // fetch(`http://localhost:8080/api/shows/${imdb}`)
  fetch(`https://wbdv-team18-final-project.herokuapp.com/api/shows/${imdb}`)
    .then(response => response.json())