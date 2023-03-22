function loadAuthors(){
    fetch('http://127.0.0.1:8000/api/v1/author/')
        .then(response => response.json())
        .then(data => {
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
        }).catch(err => console.log(err));
}