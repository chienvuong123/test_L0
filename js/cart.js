const showCart = document.querySelector(".cart-list");


// hàm getbyId
const getByIdSp = (id) => {
    const productData = local.getDataLocal('product');
    const itemData = productData.find((item) => item.id === id);
    return itemData;
}
// Hàm tính tổng giá của một sản phẩm trong giỏ hàng
function calculateProductTotal(product, quantity) {
    return product.subTotal * quantity;
}

// Hàm tính tổng giá của tất cả sản phẩm trong giỏ hàng
function calculateTotal(cartData, productData) {
    return cartData.reduce((total, item) => {
        const product = getByIdSp(item.id, productData);
        const productTotal = calculateProductTotal(product, item.quantity);
        return total + productTotal;
    }, 0);
}
// Hàm hiển thị giỏ hàng
const listCart = () => {
    const listDataCart = local.getDataLocal('cart');
    if (listDataCart === null || listDataCart.length === 0) {
        showCart.innerHTML = `
            <img src="../image/cart.png"  style="width: 100%; height: 400px">
        `;
    } else {
        const totalAll = calculateTotal(listDataCart);
        let queryHTML = `
            <div class="content_list">
                <span class="list_product">Product Name</span>
                <div class="list_quantity">
                    <span>Quantity</span>
                    <span>Subtotal</span>
                    <span>Total</span>
                    <span>Clear Cart</span>
                </div>
            </div>
           
        `
        // const productData = local.getDataLocal('product');
        queryHTML += listDataCart.map((item, index) => {
            let product = getByIdSp(item.id);
            // console.log(product);
            const totalPriceOne = calculateProductTotal(product, item.quantity);
            // const totalPrice = calculateTotal(listDataCart,productData);
            return `
            <div class="content_data">
                <div class="list_data_cart">
                    <div class="data_img">
                        <img style="width: 100px; height: 80px;" src="../image/${product.imgURL}" alt="">
                        <div class="img_colums">
                            <span class="img_title">${product.name}</span>
                            <span class="img_quantity">quantity: ${product.quantity}</span>
                        </div>
                    </div>
                    <div class="counter">
                        <button class="decrement" onclick="decrementQuantity(${item.id})">-</button>
                        <span class="count">${item.quantity}</span>
                        <button class="increment" onclick="incrementQuantity(${item.id})">+</button>
                    </div>
                    <div class="data_right">
                        <span style="display: flex; align-items: center;">$ ${product.subTotal.toLocaleString()}</span>
                        <span style="margin-left: 85px;">$ ${totalPriceOne.toLocaleString()}</span>
                        <span class="data_icon" style="margin-left: 90px;">
                            <button onClick="removeProduct(${item.id})">
                                <i class="fa-regular fa-circle-xmark"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            
            `

        }).join("");
        queryHTML += `
                
                    <span class="buy">
                        <span>Total: $ ${totalAll.toLocaleString()}</span>
                        <button>Buy</button>
                    </span>
            `
        showCart.innerHTML = queryHTML;
    }
}
listCart();

// Hàm xóa sản phẩm khỏi giỏ hàng
const removeProduct = (idSp) => {
    const confirmDelete = window.confirm("Bạn có muốn xóa sản phẩm ra khỏi giỏ hàng không!");
    if (confirmDelete) {
        let cartData = local.getDataLocal('cart');
        const productIndex = cartData.findIndex((item) => item.id === idSp);
        if (productIndex !== -1) {
            cartData.splice(productIndex, 1);
            local.saveDataLocal(cartData, 'cart');
            listCart();
            countNumberCart(cartData);
            // updateUniqueProductCount(dataCart);
        }
    }
}

// Lấy nút "Buy"
const informationSectionWrapper = document.querySelector('#information-backdrop');
const buyButton = document.querySelector('.buy button');
buyButton.addEventListener('click', function () {
    informationSectionWrapper.classList.add('active')
});
// Lấy nút "Hủy"
const cancelButton = document.querySelector('.cancel');
cancelButton.addEventListener('click', function () {
    informationSection.style.display = 'none';
});

//tăng sl
function incrementQuantity(productId) {
    let cartData = local.getDataLocal('cart');
    const productIndex = cartData.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
        const product = getByIdSp(productId);
        if (cartData[productIndex].quantity < product.quantity) {
            cartData[productIndex].quantity++;
            local.saveDataLocal(cartData, 'cart');
            listCart();
        } else {
            alert("Sản phẩm vượt quá số lượng trong kho!");
        }
    }
}

// giảm sl
function decrementQuantity(productId) {
    let cartData = local.getDataLocal('cart');
    const productIndex = cartData.findIndex((item) => item.id === productId);

    if (productIndex !== -1 && cartData[productIndex].quantity > 1) {
        cartData[productIndex].quantity--;
        local.saveDataLocal(cartData, 'cart');
        listCart();
    }
}
