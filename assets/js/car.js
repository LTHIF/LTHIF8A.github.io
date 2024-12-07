document.addEventListener('DOMContentLoaded', function() {
    // Arreglo para almacenar los productos en el carrito
    let cart = [];

    // Precio de oferta (10% de descuento)
    const discountPercentage = 10;

    // Función para agregar productos al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price')); // Asegúrate de que sea un número

            // Agregar el producto al carrito
            cart.push({ name: productName, price: productPrice });

            // Mostrar los productos en el carrito
            updateCart();
        });
    });

    // Función para actualizar el carrito
    function updateCart() {
        const cartList = document.getElementById('cart-list');
        const totalPrice = document.getElementById('total-price');

        // Limpiar el carrito actual
        cartList.innerHTML = '';

        // Añadir los productos al carrito
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `${item.name} - $${item.price}`; // Formatear el precio
            cartList.appendChild(listItem);
            total += item.price;
        });

        // Aplicar el descuento (si corresponde)
        let discountedTotal = total - (total * discountPercentage / 100);

        // Actualizar el total
        totalPrice.textContent = discountedTotal.toFixed(2); // Mostrar el total con 2 decimales
    }

    // Función para manejar la finalización de la compra
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Compra realizada con éxito');
            // Limpiar carrito después de la compra
            cart = [];
            updateCart();
            // Cerrar el modal
            var modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
            modal.hide();
        } else {
            alert('Tu carrito está vacío');
        }
    });
});
