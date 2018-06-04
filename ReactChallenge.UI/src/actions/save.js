export default function save(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        cache: 'cache',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'client'
    }).then(response => response.json())
      .catch(error => new Error("Something has gone wrong, the data has not being added"));
};