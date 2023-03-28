async function loadUsers() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/user/');
        const data = await response.json();
        renderUsers(data);
    } catch (error) {
        console.error(error);
    }
}

function renderUsers(data) {
    const tableBody = document.querySelector('#users tbody');
    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.middle_name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button>details</button>
      </td>
    `;
        tableBody.appendChild(row);
    });
}

loadUsers();
