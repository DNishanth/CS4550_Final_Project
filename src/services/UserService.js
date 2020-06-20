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

const getCurrentUser = () => {
    return fetch('http://localhost:8080/api/profile', {
        // return fetch('https://wbdv-team18-final-project.herokuapp.com/api/profile', {
        credentials: 'include'
    }).then(response => response.json()).catch(e => {
        console.log(e);
    }).then(user => {
        return user
    })
};

export default {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    getCurrentUser
}