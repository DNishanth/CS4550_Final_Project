export const findPostsForDiscussion = (showId) =>
  fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions/${showId}`)
    .then(response => response.json())

export const createPost = (showId, post) =>
  fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions/${showId}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const createShowDiscussion = (show) =>
  fetch(`https://wbdv-team18-final-project.herokuapp.com/api/discussions`, {
    method: 'POST',
    body: JSON.stringify(show),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())

export const findShowByImdb = (imdb) =>
  fetch(`https://wbdv-team18-final-project.herokuapp.com/api/shows/${imdb}`)
    .then(response => response.json())