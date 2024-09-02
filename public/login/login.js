const submitBtn = document.getElementById('registerForm');

submitBtn.addEventListener('click', registrar);

async function registrar(e) {
    e.preventDefault();
    window.location.href = './register/register.html';
}