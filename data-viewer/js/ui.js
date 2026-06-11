const userGrid = document.querySelector('#user-grid');
const loading = document.querySelector('#loading');
const error = document.querySelector('#error');

function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <h2>${user.name}</h2>
    <p>Email: <span>${user.email}</span></p>
    <p>City: <span>${user.address.city}</span></p>
    <p>Company: <span>${user.company.name}</span></p>
  `;
  return card;
}

function renderUsers(users) {
  users.forEach(user => {
    const card = createUserCard(user);
    userGrid.appendChild(card);
  });
}

function showLoading() {
  loading.classList.remove('hidden');
  error.classList.add('hidden');
  userGrid.innerHTML = '';
}

function showError() {
  loading.classList.add('hidden');
  error.classList.remove('hidden');
}

function hideLoading() {
  loading.classList.add('hidden');
}
