document.addEventListener('DOMContentLoaded', () => {

let catID = localStorage.getItem('catID')

function fetchProducts() {
    fetch('https://japceibal.github.io/emercado-api/cats_products/' + catID + '.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('productos-container');
        container.innerHTML = `
        <h1>${data.catName}</h1>
        <hr> 
        `; 

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
                    <div class="titulo_producto">
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
    document.getElementById('mostrarUsuario').textContent = usuario;
} else {
    document.getElementById('mostrarUsuario').textContent = 'No has iniciado sesión';
}
fetchProducts();    

                            
    const minPrecioInput = document.getElementById('min-precio');
    const maxPrecioInput = document.getElementById('max-precio');
    const filterButton = document.getElementById('boton-filtrar');
    const clearButton = document.getElementById('boton-limpiar');
    const botonPrecioAsc = document.getElementById('precio-ascendente');
    const botonPrecioDesc = document.getElementById('precio-descendente');
    const botonRelevancia = document.getElementById('ordenar-relevancia');
    const buscadorInput = document.getElementById('buscador');


    function filtrarYOrdenarProducts(ordenamiento = null) {
        let productsFiltrados = products;

        // filtrar por buscador
        const buscador = buscadorInput.value.toLowerCase();
        if (buscador) {
            productsFiltrados = productsFiltrados.filter(product => {
                return product.name.toLowerCase().includes(buscador) || product.description.toLowerCase().includes(buscador);
            });
        }

        // filtrar por precios
        const minPrecio = parseFloat(minPrecioInput.value);
        const maxPrecio = parseFloat(maxPrecioInput.value);

        if (!isNaN(minPrecio)) { // asegura que minPrecio es un número 
            productsFiltrados = productsFiltrados.filter(product => product.cost >= minPrecio); // actualiza la lista de productsFiltrados con los que cumplen el filtro
        }

        if (!isNaN(maxPrecio)) {
            productsFiltrados = productsFiltrados.filter(product => product.cost <= maxPrecio);
        }

        // ordenar
        if (ordenamiento === 'precio-asc') {
            productsFiltrados.sort((a, b) => a.cost - b.cost);
        } else if (ordenamiento === 'precio-desc') {
            productsFiltrados.sort((a, b) => b.cost - a.cost);
        } else if (ordenamiento === 'vendidos-desc') {
            productsFiltrados.sort((a, b) => b.soldCount - a.soldCount);
        }

        // mostrar productos filtrados y ordenados
        cargarProducts(productsFiltrados);
    }

    function limpiarFiltros() {
        minPrecioInput.value = '';
        maxPrecioInput.value = '';
        fetchProducts(); // recargar los productos sin filtrar
    }

    // event listeners para aplicar filtros y orden
    filterButton.addEventListener('click', () => {
        filtrarYOrdenarProducts(); // aplicar filtro sin cambiar el orden
    });

    clearButton.addEventListener('click', () => {
        limpiarFiltros();
    });

    botonPrecioAsc.addEventListener('click', () => {
        filtrarYOrdenarProducts('precio-asc'); // ordenar por precio ascendente
    });

    botonPrecioDesc.addEventListener('click', () => {
        filtrarYOrdenarProducts('precio-desc'); // ordenar por precio descendente
    });

    botonRelevancia.addEventListener('click', () => {
        filtrarYOrdenarProducts('vendidos-desc'); // ordenar por relevancia
    });

    buscadorInput.addEventListener('input', () => {
        filtrarYOrdenarProducts(); // buscador
    });

});
