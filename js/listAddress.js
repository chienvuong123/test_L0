let districtID; 
// data tỉnh
async function getProvincesFromApi() {
  return fetch("https://provinces.open-api.vn/api/p/")
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}
// lấy huyện theo Id tỉnh
async function getDistrictsByProvinceID(id) {
  return fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}
// lấy xã theo Id huyện
async function getWardsByDistrictsID(id) {
  return fetch(`https://provinces.open-api.vn/api/d/${id}?depth=2`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

function updateSelectAddressUI(data, selectorNode, role) {
  const roleList = {
    Province: "<option selected value=''>--Chọn Tỉnh/Thành phố--</option>",
    District: "<option selected value=''>--Chọn Quận/Huyện--</option>",
    Ward: "<option selected value=''>--Chọn Phường/Xã--</option>",
  };
  if (data) {
    selectorNode.innerHTML = "";
    const optionTagList = data.map((element) => {
      return `<option value=${element.code}>${element.name}</option>`;
    });
    optionTagList.unshift(roleList[role]);
    selectorNode.innerHTML = optionTagList.join("");
  } else {
    selectorNode.innerHTML = roleList[role];
  }
}
// tỉnh
async function updateProvinces() {
  try {
    const provinces = await getProvincesFromApi();
    const selectorProvince = document.querySelector("#city");
    updateSelectAddressUI(provinces, selectorProvince, "Province");
    selectorProvince.addEventListener("change", (event) => {
      updateDistricts(event.target.value);
    });

    if (selectorProvince.value !== "none") {
      updateDistricts(selectorProvince.value);
    }
  } catch (error) {
    console.error(error);
  }
}
// huyện theo Id tỉnh
async function updateDistricts(id) {
  try {
    const selectorDistricts = document.querySelector("#district");
    
    if (selectorDistricts.value !== "none") {
      const data = await getDistrictsByProvinceID(id);
      updateSelectAddressUI(data.districts, selectorDistricts, "District");
      selectorDistricts.addEventListener("change", () => {
        if (selectorDistricts.value !== "none") {
          updateWards(selectorDistricts.value);
        }
      });

      updateWards(selectorDistricts.value);
    }
  } catch (error) {
    console.error(error);
  }
}
// phường theo id huyện
async function updateWards(id) {
  try {
    const selectorWards = document.querySelector("#commune");
    
    if (id !== "none") {
      const data = await getWardsByDistrictsID(id);
      updateSelectAddressUI(data.wards, selectorWards, "Ward");
    } else {
      updateSelectAddressUI(null, selectorWards, "Ward");
    }
  } catch (error) {
    console.error(error);
  }
}


document.addEventListener("DOMContentLoaded", updateProvinces);
