const getAllUsers = () => {
    return fetch('https://wbdv-generic-server.herokuapp.com/api/group18/users')
        .then(response => response.json())
}

const getUser = (userId) => {
    return fetch(`https://wbdv-generic-server.herokuapp.com/api/group18/${userId}`)
        .then(response => response.json())
}

// const deleteModule = (moduleId) => {
//     return fetch('https://wbdv-generic-server.herokuapp.com/api/001298520/modules/' + moduleId,{
//         method: 'DELETE'
//     })
//         .then(response => response.json())
// }
//

const createUser = (user) => {
    return fetch(`https://wbdv-generic-server.herokuapp.com/api/group18/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

const updateUser = (userId, user) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/group18/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export default {
    getAllUsers,
    getUser,
    createUser,
    updateUser
}