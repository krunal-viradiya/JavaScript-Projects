
document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 39.99 },
        { id: 3, name: "Product 3", price: 49.99 },
        { id: 4, name: "Product 4", price: 59.99 }
    ];

    const cart = [];

    const productsData = document.getElementById('product-data');
    const cartData = document.getElementById('product-cart-list');
    const emptyMessage = document.getElementById('empty_cart');
    const checkoutData = document.getElementById('checkout-data');
    const totalPriceDisp = document.getElementById('total_price');
    const checkoutButton = document.getElementById('checkout');


    products.forEach((p) => {
        const printProduct = document.createElement('div');
        printProduct.classList.add('new-style');
        printProduct.innerHTML = `
            <span> ${p.name} - $${p.price.toFixed(2)} </span>
            <button data-id=${p.id}> Add Cart </button>
        `;
        productsData.appendChild(printProduct);
        checkoutData.classList.add('hidden');
    });

    productsData.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            checkoutData.classList.remove('hidden');
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        console.log(product);
        renderCart();
    }

    function renderCart() {
        let totalPrice = 0;
        cartData.innerHTML = "";

        if (cart.length > 0) {
            emptyMessage.classList.add('hidden');
            cart.forEach((p) => {
                totalPrice += p.price;
                const cartItems = document.createElement('div');
                cartItems.innerHTML = `
                    ${p.name} : $${p.price.toFixed(2)}
                `;
                cartData.appendChild(cartItems);
            })
            totalPriceDisp.textContent = `${totalPrice.toFixed(2)}`;
        } else {
            totalPriceDisp.textContent = "$0.00";
            checkoutData.classList.add('hidden');
            emptyMessage.classList.remove('hidden');
        }
    }

    checkoutButton.addEventListener('click', () => {
        cart.length = 0;
        alert('Orders checkout successfully!');
        
        renderCart();
        // emptyMessage.classList.remove('hidden');

    })

})
