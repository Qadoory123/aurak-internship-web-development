async function fetchUsers() {
  showLoading();

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const users = await response.json();
    hideLoading();
    renderUsers(users);

  } catch (err) {
    showError();
    console.error('Fetch failed:', err);
  }
}

fetchUsers();
