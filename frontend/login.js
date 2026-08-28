const API_BASE = 'http://localhost:3001';
const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.error || 'Login failed';
            return;
        }

        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';

    } catch (err) {
        errorMessage.textContent = 'Could not reach the server';
        console.error(err);
    }
});