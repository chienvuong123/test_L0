
// Bai 1
const listData = [
    {
        id: 1,
        name: "giày air force one",
        quantity: 143,
        subTotal: 1000,
        total: 3200,
        imgURL: "giay1.jpg"
    },
    {
        id: 2,
        name: "Giày Nike AF1 Low Super",
        quantity: 143,
        subTotal: 1200,
        total: 4300,
        imgURL: "giay2.jpg"

    },
    {
        id: 3,
        name: "Giày Nike Air Force one Low",
        quantity: 3,
        subTotal: 1700,
        total: 2300,
        imgURL: "giay3.jpg"

    },
    {
        id: 4,
        name: "Nike Air Force 1 '07",
        quantity: 19,
        subTotal: 1700,
        total: 3500,
        imgURL: "giay5.jpg"

    },
    {
        id: 5,
        name: "Nike Air Force 1 LV8",
        quantity: 19,
        subTotal: 1700,
        total: 3500,
        imgURL: "giay5.jpg"

    },
    {
        id: 6,
        name: "Nike Air Force 1 LE",
        quantity: 22,
        subTotal: 8700,
        total: 9800,
        imgURL: "giay6.jpg"

    },
    {
        id: 7,
        name: "Nike Air Force 1 Low By You",
        quantity: 1,
        subTotal: 1100,
        total: 3300,
        imgURL: "giay7.jpg"

    },
    {
        id: 8,
        name: "Nike Air Force 1 Low By You",
        quantity: 2,
        subTotal: 1100,
        total: 3300,
        imgURL: "giay8.jpg"

    },

]
const countNumberCart = () => {
    let dataCart = local.getDataLocal("cart") || [];
    updateUniqueProductCount(dataCart);
    renderListProduct();

};

document.addEventListener("DOMContentLoaded", countNumberCart);

