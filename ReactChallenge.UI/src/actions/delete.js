export default (url, data) => {
    return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => new Error("It's impossible to delete user, smth gone wrong"))
};