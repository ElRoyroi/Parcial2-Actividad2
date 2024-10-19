// Variables
const cartSidebar = document.getElementById('cart-sidebar'); // Contenedor del carrito
const cartItemsContainer = document.getElementById('cart-items'); // Contenedor de productos en el carrito
const totalPriceElement = document.getElementById('total-price'); // Elemento del precio total
const subtotalPriceElement = document.getElementById('subtotal-price'); // Elemento del subtotal
const taxPriceElement = document.getElementById('tax-price'); // Elemento de impuestos
const productsSection = document.querySelector('.container.mt-5'); // Sección de productos
const cartButton = document.getElementById('cart-button'); // Botón del carrito
let cartCount = 0; // Contador de productos
let total = 0; // Total acumulado

// 1. Crear y añadir el contador al ícono del carrito
const cartCountElement = document.createElement('span');
cartCountElement.id = 'cart-count'; // ID del contador
cartCountElement.classList.add('badge', 'bg-danger'); // Clases para estilo
cartCountElement.style.position = 'absolute'; // Posición absoluta para el contador
cartCountElement.style.top = '-10px'; // Posición superior
cartCountElement.style.right = '-10px'; // Posición derecha
cartCountElement.textContent = cartCount; // Inicializa el contador
cartButton.appendChild(cartCountElement); // Añade el contador al botón del carrito

// 2. Mostrar / Ocultar carrito con clase activa
function toggleCart() {
    cartSidebar.classList.toggle('active'); // Alterna la visibilidad del carrito
    productsSection.classList.toggle('products-shift'); // Desplaza los productos
}

// 3. Agregar producto al carrito (click en botones .add-to-cart)
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (e) => { // Evento click para añadir productos
        const card = e.target.closest('.card'); // Selecciona la tarjeta del producto
        const title = card.querySelector('.card-title').textContent; // Obtiene el título
        const price = parseFloat(
            card.querySelector('.card-text strong').textContent.replace('$', '').replace(',', '') // Obtiene y convierte el precio a número
        );
        const imgSrc = card.querySelector('img').src; // Obtiene la imagen del producto

        addItemToCart(title, price, imgSrc); // Añade el artículo al carrito
        updateTotal(price); // Actualiza el total del carrito
        updateCartCount(1); // Incrementa el contador en 1
    });
});

// 4. Función para agregar un elemento al carrito
function addItemToCart(title, price, imgSrc) {
    const cartItem = document.createElement('div'); // Crea un nuevo elemento para el carrito
    cartItem.classList.add('cart-item'); // Añade la clase para el carrito
    cartItem.innerHTML = `
        <img src="${imgSrc}" alt="${title}"> <!-- Imagen del producto -->
        <div>
            <p>${title}</p> <!-- Título del producto -->
            <p><strong>$${price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</strong></p> <!-- Precio formateado -->
        </div>
        <button class="btn btn-danger btn-sm remove-item">Eliminar</button> <!-- Botón para eliminar el artículo -->
    `;

    cartItemsContainer.appendChild(cartItem); // Añade el nuevo elemento al contenedor del carrito

    // 5. Eliminar producto del carrito
    cartItem.querySelector('.remove-item').addEventListener('click', () => {
        cartItem.remove(); // Elimina el artículo del carrito
        updateTotal(-price); // Actualiza el total, restando el precio
        updateCartCount(-1); // Decrementa el contador en 1
    });
}

// 6. Actualizar el total del carrito
function updateTotal(price) {
    total += price; // Suma o resta el precio al total
    const tax = total * 0.1; // Calcula el impuesto (10%)
    subtotalPriceElement.textContent = `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`; // Actualiza el subtotal
    taxPriceElement.textContent = `$${tax.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`; // Actualiza el impuesto
    totalPriceElement.textContent = `$${(total + tax).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`; // Actualiza el total final
}

// 7. Actualizar el contador del carrito
function updateCartCount(change) {
    cartCount += change; // Modifica el contador según el cambio
    cartCountElement.textContent = cartCount; // Actualiza el texto del contador

    // Ocultar el contador si no hay productos
    if (cartCount === 0) {
        cartCountElement.style.display = 'none'; // Oculta el contador
    } else {
        cartCountElement.style.display = 'inline'; // Muestra el contador
    }
}

// 8. Proceder a pagar
function proceedToCheckout() {
    alert('Redirigiendo a la página de pago...'); // Mensaje de alerta para redirigir a la página de pago
}
