async function loadBooks() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/book/');
        const data = await response.json();
        renderBooks(data);
    } catch (error) {
        console.error(error);
    }
}

function renderBooks(data) {
    const divBody = document.querySelector('#books-articles div');
    data.forEach(book => {
        const row = document.createElement('article');
        row.innerHTML = `
      <img src="${book.image}" alt="${book.name}">
      <h3>${book.name}</h3> 
    `;
        book.authors.forEach(author => {
            const authorElement = document.createElement('p');
            authorElement.textContent = 'by ' + author.name;
            row.appendChild(authorElement);
        });
        divBody.appendChild(row);
    });
}

loadBooks();