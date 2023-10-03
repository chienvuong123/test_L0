

//cập nhật số lương sản phẩn sau khi mua
const updateQuantityOrder = () => {
    const listData = local.getDataLocal('product');
    console.log("data", listData);
    const dataCart = local.getDataLocal('cart');
    console.log(dataCart);
    dataCart.forEach((item1) => {
        listData.forEach((item2) => {
            if (item1.id === item2.id) {
                item2.quantity = item2.quantity - item1.quantity
            }
        });
    });
    local.saveDataLocal(listData, 'product');
}

function information() {
    const first_name = document.getElementById("first_name");
    const last_name = document.getElementById("last_name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const city = document.getElementById("city");
    const district = document.getElementById("district");
    const commune = document.getElementById("commune");
    const code = document.getElementById("code");
    const message = document.getElementById("message").value;
    const addressFields = [city, district, commune];
    const nameFieds = [first_name, last_name];

    const dataCart = local.getDataLocal('cart');
    const currentDate = new Date();

    function validateEmail(inputemail) {
        const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailFormat.test(inputemail);
    }
    function validatePhone(inputphone) {
        const phoneFormat = /^\d{10}$/;
        return phoneFormat.test(inputphone)
    }
    (function validateForm() {
        let validName = true;
        nameFieds.forEach((item) => {
            if (!item.value.trim()) {
                item.style.border = "1px solid red";
                validName = false;
            } else {
                {
                    item.style.border = "";
                }
            }
        })
        if (!validName) {
            document.getElementById("error_form").innerHTML = "Bạn chưa nhập tên đầy đủ!";
        } else {
            document.getElementById("error_form").innerHTML = "";
        }

        if (email.value.length === 0 || email.value.length === "") {
            email.style.border = "1px solid red";
            document.getElementById('error_form_email').innerHTML = "Bạn chưa nhập email!"
        } else if (!validateEmail(email.value)) {
            email.style.border = "1px solid red";
            document.getElementById('error_form_email').innerHTML = "Bạn chưa đúng định dạng email!"
        } else {
            email.style.border = "";
            document.getElementById('error_form_email').innerHTML = "";
        }

        if (phone.value.length === 0 || phone.value.trim() === "") {
            phone.style.border = "1px solid red";
            document.getElementById("error_form_phone").innerHTML = "Bạn chưa nhập số điện thoại!";
        } else if (!validatePhone(phone.value)) {
            phone.style.border = "1px solid red";
            document.getElementById("error_form_phone").innerHTML = "Số điện thoại không hợp lệ!";
        } else {
            phone.style.border = "";
            document.getElementById("error_form_phone").innerHTML = "";
        }

        let validAddress = true;
        addressFields.forEach(item => {
            if (!item.value.trim()) {
                item.style.border = "1px solid red";
                validAddress = false;
            } else {
                item.style.border = "";
            }
        })

        if (!validAddress) {
            document.getElementById("error_form_address").innerHTML = "Vui lòng nhập đầy đủ địa chỉ!";
        } else {
            document.getElementById("error_form_address").innerHTML = "";
        }
        const houseNumberFormat = /^[1-9][0-9]*$/;
        if (code.value.length === 0 || code.value.trim() === "") {
            code.style.border = "1px solid red";
            document.getElementById("error_form_address").innerHTML = "Vui lòng nhập đầy đủ địa chỉ!";
        } else if (!houseNumberFormat.test(code.value)) {
            document.getElementById("error_form_address").innerHTML = "Địa chỉ nhà phải nhập bằng số!";
            code.style.border = "1px solid red";
            return false
        } else {
            document.getElementById("error_form_address").innerHTML = "";
            code.style.border = "";
        }

        if (
            first_name.value.trim() !== "" &&
            last_name.value.trim() !== "" &&
            email.value.trim() !== "" &&
            validateEmail(email.value) &&
            phone.value.trim() !== "" &&
            validatePhone(phone.value) &&
            city.value.trim() !== "" &&
            commune.value.trim() !== "" &&
            district.value.trim() !== "" &&
            code.value.trim() !== ""
        ) {
            const oder = {
                id: generateUniqueID(),
                name: first_name.value + " " + last_name.value,
                email: email.value,
                phone: phone.value,
                address: ` ${commune.options[commune.selectedIndex].text}, ${district.options[district.selectedIndex].text}, ${city.options[city.selectedIndex].text}`,
                numberHome: code.value,
                purchase_date: currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "/" + currentDate.getFullYear(),
                inFor: dataCart,
                message: message
                //   total: total,
            };
            local.postApi(URLBill, oder);
            updateQuantityOrder();
            console.log(oder);
            local.saveDataLocal([], 'cart');
        }
    })();
}

// hàm id ngẫu nghiên 
const generateUniqueID = (() => {
    const randomIDList = [];

    return () => {
        let IDvalue = Math.random().toString(16).substring(2, 8);
        while (randomIDList.includes(IDvalue)) {
            IDvalue = Math.random().toString(16).substring(2, 8);
        }
        randomIDList.push(IDvalue);
        return IDvalue;
    };
})();
// lấy tên tỉnh , huyện , xã
async function updateWards(id) {
    try {
        const selectorWards = document.querySelector("#commune");

        if (id !== "none") {
            const data = await getWardsByDistrictsID(id);
            updateSelectAddressUI(data.wards, selectorWards, "Ward", true);
        } else {
            updateSelectAddressUI(null, selectorWards, "Ward");
        }
    } catch (error) {
        console.error(error);
    }
}