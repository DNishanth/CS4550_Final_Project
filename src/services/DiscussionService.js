export const findPostsForDiscussion = (showId) =>
  fetch(`http://localhost:8080/api/discussions/${showId}`)
    .then(response => response.json())

export const createPost = (showId, post) =>
  fetch(`http://localhost:8080/api/discussions/${showId}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const createShowDiscussion = (show) =>
  fetch(`http://localhost:8080/api/discussions`, {
    method: 'POST',
    body: JSON.stringify(show),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const findShowByImdb = (imdb) =>
  fetch(`http://localhost:8080/api/shows/${imdb}`)
    .then(response => response.json())