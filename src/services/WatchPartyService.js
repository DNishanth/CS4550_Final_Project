export const findWatchPartyWatchlist = (watchParty) =>
    fetch(`http://localhost:8080/api/watch-parties/${watchParty.id}/shows`)
        // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchParty.id}/shows`)
        .then(response => response.json())

export const addPartyToUser = (userId, watchParty) =>
    fetch(`http://localhost:8080/api/users/${userId}/watch-party`, {
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${userId}/watch-party`, {
        method: 'PUT',
        body: JSON.stringify(watchParty),
        headers: {
            'content-type': 'application/json'
        }}).then(response => response.json())

export const removePartyFromUser = (userId, watchPartyId) =>
    fetch(`http://localhost:8080/api/users/${userId}/watch-party/${watchPartyId}`, {
        // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${userId}/watch-party/${watchPartyId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        }}).then(response => response.json()).catch(e => {})

export const addUserToParty = (user, watchPartyId) =>
    fetch(`http://localhost:8080/api/watch-parties/${watchPartyId}/users/${user.id}`, {
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchPartyId}/users`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }}).then(response => response.json())

export const createWatchParty = (user) =>
    fetch(`http://localhost:8080/api/watch-parties`, {
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }}).then(response => response.json())

export const findUserWatchParty = (user) =>
        fetch(`http://localhost:8080/api/users/${user.id}/watch-party`)
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/users/${user.id}/watch-party`)
        .then(response => response.json()).catch(e => {})

export const findWatchPartyById = (watchPartyId) =>
        fetch(`http://localhost:8080/api/watch-parties/${watchPartyId}`)
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchPartyId}`)
        .then(response => response.json())

export const deleteWatchParty = (watchPartyId) =>
        fetch(`http://localhost:8080/api/watch-parties/${watchPartyId}`, {
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchPartyId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json'}
        }).then(response => response.json())

export const findWatchPartyMembers = (watchParty) =>
    fetch(`http://localhost:8080/api/watch-parties/${watchParty.id}/users`)
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchParty.id}/users`)
        .then(response => response.json())

export const removeUserFromParty = (userId, watchPartyId) =>
    fetch(`http://localhost:8080/api/watch-parties/${watchPartyId}/users/${userId}`, {
    // fetch(`https://wbdv-team18-final-project.herokuapp.com/api/watch-parties/${watchPartyId}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        }}).then(response => response.json())