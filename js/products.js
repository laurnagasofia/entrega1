document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('productos-container');
            container.innerHTML = ''; 

            data.products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('producto');

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="titulo_producto">
                        <h2>${product.name}</h2>
                    </div>
                    <p>${product.description}</p>
                    <div class="precio">
                        <p>${product.currency}${product.cost}</p>
                    </div>
                    <p>Cant. vendidos: ${product.soldCount}</p>
                `;

                container.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error consultando API:', error));
}