export default function load (url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.addEventListener('load', () => {
            xhr.status >= 200 || xhr.status < 400
                ? resolve(xhr.responseText)
                : reject(new Error(`Request failed ${xhr.statusText}`));
        });

        xhr.addEventListener('error', () => {
            reject(new Error('Network Error!'));
        });

        xhr.send();
    });
};