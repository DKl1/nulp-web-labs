function loadBooks() {
    fetch('http://127.0.0.1:8000/api/v1/book/')
        .then(response => response.json())
        .then(data => {
            const divBody = document.querySelector('#books-articles div');
            data.forEach(book => {
                const row = document.createElement('article');
                row.innerHTML = `
                    <img src="${book.image}" alt="${book.name}">
                    <h3>${book.name}</h3> 
                `;
                book.authors.forEach(author => {
                    const authorElement = document.createElement('p');
                    authorElement.textContent = 'by '  + author.name;
                    row.appendChild(authorElement);
                });
                divBody.appendChild(row);
            });
        })
        .catch(error => console.error(error));
}

