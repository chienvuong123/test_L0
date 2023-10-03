const keyLocalStorageListSp = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";
const URLBill = "http://localhost:3000/bills";


const local = (function() {
    return {
        saveDataLocal(inputData, typeData) {
            if (typeData === 'cart') {
                localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(inputData));
            } else if (typeData === 'product') {
                localStorage.setItem(keyLocalStorageListSp, JSON.stringify(inputData));
            }
        },
        getDataLocal(typeData) {
            let data;
            try {
                if (typeData === 'cart') {
                    data = JSON.parse(localStorage.getItem(keyLocalStorageItemCart));
                } else if (typeData === 'product') {
                    data = JSON.parse(localStorage.getItem(keyLocalStorageListSp));
                }
            } catch (error) {
                console.error(`Lỗi khi phân tích dữ liệu từ Local Storage: ${error}`);
            }
            return data;
        },
// Api
        async getApis() {
            try {
                const response = await fetch(URLBill);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching API:', error);
                return null;
            }
        },

        async postApi(URL, data) {
            try {
              const response = await fetch(URL, {
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(data)
              });
        
              if (response.ok) {
                const resData = await response.json()
                return resData
              } else {
                throw new Error("Error posting")
              }
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
        async removeApi (id) {
            return fetch(`${URLBill}/${id}`,{
                method: "DELETE",
            })
            .then((respose) =>{
                return respose.ok;
            })
            .catch((error) =>{
                console.log(error);
            });
        }
        
    }
})();
