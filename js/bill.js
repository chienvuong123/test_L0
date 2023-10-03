const showBill = document.querySelector(".list_data_bill");
const showDetail = document.querySelector(".detail");
const listBill = async () => {
    try {
        const dataBill = await local.getApis();

        if (Array.isArray(dataBill) && dataBill.length > 0) {
            showBill.innerHTML = `
                <div class="list_bill">
                    <ul>
                        <li>Code</li>
                        <li>Cust Name</li>
                        <li>Date</li>
                        <li>Item Numbers</li>
                        <li>Total Quantity</li>
                        <li>Total Price</li>
                        <li>Return</li>
                    </ul>
                </div>
                `
            let queryHTML = dataBill.map((item, index) => {
                const { totalQuantity, totalPrice } = calculateTotalQuantityAndPrice(item);
                return `
                    <ul style="position:relative">
                        <button class="detail_dow detail_btn" data-id="${item.id}" >Detail <i class="fa-solid fa-sort-down"></i></button>
                        <li>${item.id}</li>
                        <li>${item.name}</li>
                        <li>${item.purchase_date}</li>
                        <li>${item.inFor?.length}</li>
                        <li>${totalQuantity}</li>
                        <li>$ ${totalPrice.toLocaleString()}</li>
                        <li>
                            <button onclick="deleteOrder('${item.id}')"><i class="fa-solid fa-xmark"></i></button>
                        </li>
                        <li class="detail" style="position:absolute; top: 100%; left: 0;"></li>
                    </ul>
                `

            }).join('');

            showBill.innerHTML += queryHTML;

            const detailBtns = document.getElementsByClassName('detail_btn')
            for (item of detailBtns) {
                console.log(item.getAttribute("data-id"))
                item.addEventListener('click',
                    handleSelectDetail)
            }
        } else {
            showBill.innerHTML = `
             <img class="img_no_data" src="../image/empty.png" >
            `;
        }
    } catch (error) {
        console.error("Error fetching dataBill:", error);
    }
}

listBill();
//Cập nhập số lượng sau khi hủy
const updateCancelOder = (dataBill) => {
    let listData = local.getDataLocal('product');
    const updateListData = listData.map((product) => {
        const dataProBill = dataBill?.inFor.find((item) => item.id === product.id)
        if (dataProBill) {
            return {
                ...product,
                quantity: product.quantity + dataProBill.quantity
            }
        }
        return product;
    });
    local.saveDataLocal(updateListData, "product");

};
// xóa đơn hàng

const deleteOrder = async (orderId) => {
    const showDelete = window.confirm("Bạn có thật sự muốn xóa không!");
    if (showDelete) {
        try {
            const dataBills = await local.getApis(`${URLBill}`);
            const selectedItem = dataBills.find(item => item.id == orderId)

            updateCancelOder(selectedItem);

            await local.removeApi(orderId);
        } catch (error) {
            console.error(error);
        }
    }
};


// tổng số lượng và tổng tiền
function calculateTotalQuantityAndPrice(bill) {
    let totalQuantity = 0;
    let totalPrice = 0;
    if (Array.isArray(bill.inFor)) {
        bill.inFor.forEach((product) => {
            const listData = local.getDataLocal("product");
            const foundProduct = listData?.find((item) => item.id === product.id);
            if (foundProduct) {
                totalQuantity += product.quantity;
                totalPrice += product.quantity * foundProduct.subTotal;
            }
        });
    }
    return { totalQuantity, totalPrice };
}


//ẩn hiện

const detailDow = document.getElementById("detailDow");
const detailContent = document.getElementById("detailContent");

function handleCloseDetail() {
    console.log(this)
    element.classList.remove('active')
    element.innerHTML = ""
}

async function handleSelectDetail() {
    const id = this.getAttribute('data-id')

    const activeBoxs = document.querySelectorAll('.detail.active')
    activeBoxs.forEach(item => {
        item.classList.remove('active')
        item.innerHTML = ""
    })

    const detailBox = this.parentNode
    const wrapper = detailBox.children[detailBox.children.length - 1]
    wrapper.classList.add('active')

    const dataBill = await local.getApis();

    const selectedItem = dataBill.find(item => item.id == id)

    const detailsContent = `
    
    <button class="detail_out" ><i class="fa-solid fa-x"></i></button>
    <h2>Thông tin người đặt</h2>
    <div class="detail_infor">
        <span>Họ và tên: ${selectedItem.name}</span>
        <span>Email: ${selectedItem.email}</span>
        <span>Phone: ${selectedItem.phone}</span>
        <span>Địa chỉ: ${selectedItem.address}</span>
        <span>Số nhà: ${selectedItem.numberHome}</span>
        <span>Lời nhắn: ${selectedItem.message ? selectedItem.message : 'Không có lời nhắn nào'}</span>
    </div>
    <h2>Thông tin sản phẩm</h2>
    <div class="content_data">
        <div class="list_data_cart">
                ${generateProductListHTML(selectedItem.inFor)}
            </div>
        </div>
    </div>
    
    `
    wrapper.innerHTML = detailsContent



    function generateProductListHTML(products) {
        return products.map((product) => {
            const listData = local.getDataLocal('product');
            const productBill = listData?.find((item) => item.id === product.id)
            if (productBill) {
                return `
                <div class="data_img">
                    <img style="width: 80px; height: 60px;" src="../image/${productBill.imgURL}" alt="">
                    <div class="img_colums">
                        <span class="img_title">${productBill.name}</span>
                        <span class="img_quantity">Quantity: ${product.quantity}</span>
                    </div>
                </div>
            `;
            }
        }).join('');
    }

    const closeBtns = document.getElementsByClassName("detail_out")
    for (item of closeBtns) {
        item.addEventListener('click', function () {
            this.parentNode.classList.remove('active')
            this.parentNode.innerHTML = ""
        })
    }

}











