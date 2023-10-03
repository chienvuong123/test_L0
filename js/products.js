const showProducts = document.querySelector('.list_products');

(function () {
    const dataPro = local.getDataLocal("product");
    if (!dataPro) {
        local.saveDataLocal(listData, "product");
    }
})();
// localStorage.clear()
// hàm tăng số lượng khi thêm vào giỏ hàng
// const updateCartItemCount = (dataCart) => {
//     const cartItemCountElement = document.getElementById('cartItemCount');
//     if (cartItemCountElement) {
//         const totalQuantity = dataCart.reduce((total, item) => total + item.quantity, 0);
//         cartItemCountElement.textContent = totalQuantity.toString();
//     }
// }

// hàm show products
const renderListProduct = () => {
    const dataPro = local.getDataLocal('product');
    const showData = dataPro.map((item, index) => {
        return `
                <div class="product">
                    <img src="image/${item.imgURL}" alt="">
                    <div class="product_icon" >
                        <button onClick="addSp(${item.id})">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                    <span id="name" class="product_title">${item.name}</span>
                    <span class="product_infor">
                        <a id="subTotal" >$ ${item.subTotal}</a>
                        <a id="quantity">Quantity: ${item.quantity}</a>
                    </span>
                </div>
            `
    }).join("");
    showProducts.innerHTML = showData;

};
// renderListProduct();

// hàm thêm vào giỏ hàng
const addSp = (idSP) => {
    let dataCart = local.getDataLocal("cart") || [];
    let dataPro = local.getDataLocal("product");

    if (!dataPro) {
        console.error("Không có danh sách sản phẩm.");
        return;
    }

    let isExist = dataCart.findIndex((item) => item.id === idSP);
    let productIndex = dataPro.findIndex((item) => item.id === idSP);

    if (dataPro[productIndex].quantity === 0) {
        alert("Sản phẩm này đã hết hàng. Vui lòng chọn sản phẩm khác!");
        return;
    } else {
        if (isExist === -1) {
            dataCart.push({
                id: idSP,
                quantity: 1,
            });
        } else {
            if (dataCart[isExist].quantity >= dataPro[productIndex].quantity) {
                alert(
                    "Sản phẩm này đã hết hàng. Vui lòng chọn sản phẩm khác!"
                );
                return;
            } else {
                dataCart[isExist].quantity += 1;

            }
        }
    }
    local.saveDataLocal(dataCart, 'cart');
    countNumberCart(dataCart);
    renderListProduct();

};


const updateUniqueProductCount = (dataCart) => {
    const uniqueProductCount = dataCart.length;
    const cartItemCountElement = document.getElementById('cartItemCount');
    if (cartItemCountElement) {
        cartItemCountElement.textContent = uniqueProductCount.toString();
    }
}