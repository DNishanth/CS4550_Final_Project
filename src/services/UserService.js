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
    getCurrentUser
}