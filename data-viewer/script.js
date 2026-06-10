const userGrid = document.querySelector('#user-grid');
const loading = document.querySelector('#loading');
const error = document.querySelector('#error');

async function fetchUsers() {
  try {
    // Show loading, hide error
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    userGrid.innerHTML = '';

    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const users = await response.json();

    // Hide loading once data arrives
    loading.classList.add('hidden');

    // Render each user as a card
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';

      card.innerHTML = `
        <h2>${user.name}</h2>
        <p>Email: <span>${user.email}</span></p>
        <p>City: <span>${user.address.city}</span></p>
        <p>Company: <span>${user.company.name}</span></p>
      `;

      userGrid.appendChild(card);
    });

  } catch (err) {
    // Hide loading, show error
    loading.classList.add('hidden');
    error.classList.remove('hidden');
    console.error('Fetch failed:', err);
  }
}

fetchUsers();
