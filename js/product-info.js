document.addEventListener('DOMContentLoaded', () => { 
    const productID = localStorage.getItem("products.id"); 

    function fetchProducts2() {
        fetch('https://japceibal.github.io/emercado-api/products/' + productID + '.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('contenido-products');
            container.innerHTML = `
                <h1>Título</h1>
                <div class="scroll-container">
                    <img src="img/prod40281_1.jpg" alt="Cinque Terre">
                    <img src="img/prod40281_2.jpg" alt="Forest">
                    <img src="img/prod40281_3.jpg" alt="Northern Lights">
                    <img src="img/prod40281_4.jpg" alt="Mountains">
                </div>
                <div class="productinfo"><p>Descripción del producto, esto es un ejemplo</p></div>
                <br>
                <div class="productinfo"><p>USD14500</p></div>
            `;
        })
        .catch(error => console.error('Error consultando API:', error));
    }

    fetchProducts2(); 
});
