document.getElementById('boton').addEventListener('click', function() {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    const errorMessage = document.getElementById('error-message');

    if (usuario === '' || contrasena === '') {
        errorMessage.textContent = 'Usuario y contraseña no pueden estar vacíos.';
        return;
    }

    if (usuario && contrasena) {
        errorMessage.textContent = '';
        alert('Acceso concedido');
        document.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos.';
    }
});