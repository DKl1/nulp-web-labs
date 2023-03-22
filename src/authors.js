async function loadAuthors() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/author/');
        const data = await response.json();
        renderAuthors(data);
    } catch (error) {
        console.error(error);
    }
}

function renderAuthors(data) {
    const tableBody = document.querySelector('#authors tbody');
    data.forEach(author => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${author.name}</td>
      <td>${author.surname}</td>
      <td>${author.patronymic}</td>
    `;
        tableBody.appendChild(row);
    });
}

loadAuthors();
