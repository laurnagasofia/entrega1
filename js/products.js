document.addEventListener('DOMContentLoaded', () => {
    const minPrecioInput = document.getElementById('min-precio');
    const maxPrecioInput = document.getElementById('max-precio');
    const filterButton = document.getElementById('boton-filtrar');
    const clearButton = document.getElementById('boton-limpiar');
    const botonPrecioAsc = document.getElementById('precio-ascendente');
    const botonPrecioDesc = document.getElementById('precio-descendente');
    const botonRelevancia = document.getElementById('ordenar-relevancia');
    const buscadorInput = document.getElementById('buscador');
    const barrabusqueda=document.getElementByid('barra');

    

    let products = []; // almacena la lista de productos que se van a obtener de la API

    const catID = localStorage.getItem("catID");

    // solicitud HTTP a la URL de la API para obtener datos JSON
    function fetchProducts() {
        fetch('https://japceibal.github.io/emercado-api/cats_products/' + catID + '.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('productos-container');
            const tituloPrincipal = document.getElementById('titulo-principal');
            tituloPrincipal.innerHTML = `
                <h1>${data.catName}</h1>
                <hr>
            `;

            products = data.products; // se almacenan los datos en la variable creada antes
            cargarProducts(products); // muestra los productos en la página
        })
        .catch(error => console.error('Error consultando API:', error));
    }

    // muestra la lista de productos en el contenedor
    function cargarProducts(mostrarProducts) {
        const container = document.getElementById('productos-container');
        container.innerHTML = ''; // limpia el contenedor
        
        if (mostrarProducts.length === 0) {
            container.innerHTML = '<p class="text-center">No hay productos disponibles en esta categoría por ahora.</p>';
            return;
        }
        
        mostrarProducts.forEach(product => {
            const divProduct = document.createElement('div');
            divProduct.classList.add('producto', 'g-4', 'col-md-6', 'col-xl-4'); // añadir clases de bootstrap

            divProduct.innerHTML = `
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

            container.appendChild(divProduct);
        });
    }

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

     //busqueda de productos 
     function busqueda(){ 
        
        if (product.name.toLowerCase().includes(barrabusqueda.target.value) || product.description.toLowerCase().includes(barrabusqueda.target.value)){
            return(product.name.toLowerCase(barrabusqueda.target.value) || product.description.toLowerCase(barrabusqueda.target.value))
        }

    };
        
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

    barrabusqueda.addEventListener("input", () => {
        busqueda();
    }) // busqueda

    // Inicializar los productos al cargar la página
    fetchProducts();

    // Mostrar usuario
    let usuario = localStorage.getItem("usuario");
    if (usuario) {
        document.getElementById('mostrar-usuario').textContent = usuario;
    } else {
        document.getElementById('mostrar-usuario').textContent = 'No has iniciado sesión';
    }
    
    
});
