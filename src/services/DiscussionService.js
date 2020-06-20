export const findPostsForDiscussion = (showId) =>
  fetch(`http://localhost:8080/api/discussions/${showId}`)
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions/${showId}`)
    .then(response => response.json())

export const findPostsForUser = (userId) =>
  fetch(`http://localhost:8080/api/users/${userId}/posts`)
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions/${showId}`)
    .then(response => response.json())

export const createPost = (showId, userId, post) =>
  fetch(`http://localhost:8080/api/discussions/${showId}/posts/${userId}`, {
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions/${showId}/posts/${userId}`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const createShowDiscussion = (show) =>
  fetch(`http://localhost:8080/api/discussions`, {
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions`, {
    method: 'POST',
    body: JSON.stringify(show),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const findShowByImdb = (imdb) =>
  fetch(`http://localhost:8080/api/shows/${imdb}`)
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/shows/${imdb}`)
    .then(response => response.json())