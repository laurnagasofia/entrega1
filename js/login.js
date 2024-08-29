document.getElementById('boton').addEventListener('click', function() {
    event.preventDefault();
    let usuario = document.getElementById('usuario').value;
    let contrasena = document.getElementById('contrasena').value;
    let errorMessage = document.getElementById('error-message');

if (usuario && contrasena) {
        sessionStorage.setItem("loggedIn", "yes")
        localStorage.setItem("usuario", usuario)
        localStorage.setItem("contrasena", contrasena)
        errorMessage.textContent = '';
        alert('Acceso concedido');
        document.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Usuario y contraseña no pueden estar vacíos.';
    }

});

//Mostrar Usuario
window.addEventListener('DOMContentLoaded', () => {
    let usuario = localStorage.getItem("usuario");
    if (usuario) {
        document.getElementById('mostrarUsuario').textContent = usuario;
    } else {
        document.getElementById('mostrarUsuario').textContent = 'No has iniciado sesión';
    }
});