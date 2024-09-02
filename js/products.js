document.addEventListener('DOMContentLoaded', () => {
    

function fetchProducts() {
    fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('productos-container');
            container.innerHTML = ''; 

            data.products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('producto');
                productDiv.classList.add('g-4'); // añadir clases de bootstrap
                productDiv.classList.add('col-md-6'); // añadir clases de bootstrap 
                productDiv.classList.add('col-xl-4'); // añadir clases de bootstrap

                productDiv.innerHTML = `
                <div class="card rounded-6">
                    <div class="card-body">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="titulo-producto">
                            <h2>${product.name}</h2>
                        </div>
                            <p>${product.description}</p>
                        <div class="precio">
                            <p>${product.currency}${product.cost}</p>
                        </div>
                        <p>Cant. vendidos: ${product.soldCount}</p>
                    </div>
                </div>
                `;

                container.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error consultando API:', error));
        
    }

    fetchProducts();

//Mostrar Usuario
    let usuario = localStorage.getItem("usuario");
    if (usuario) {
        document.getElementById('mostrar-usuario').textContent = usuario;
    } else {
        document.getElementById('mostrar-usuario').textContent = 'No has iniciado sesión';
    }
 });
    



