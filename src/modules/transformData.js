let productList = [];
const pushData = (val, key) => {
  productList.push({
    id: key + 1,
    tanggal: val.tanggal,
    total: val.pengeluaraan,
    data: [
      {
        nama: val.nama,
        jam: val.jam,
        pengeluaraan: val.pengeluaraan,
      },
    ],
  });
};

const updateData = (newData, key) => {
  const stateData = productList[key].data;
  stateData.push({
    nama: newData.nama,
    jam: newData.jam,
    pengeluaraan: newData.pengeluaraan,
  });
  productList[key] = {
    id: productList[key].id,
    tanggal: productList[key].tanggal,
    total: productList[key].total + newData.pengeluaraan,
    data: stateData,
  };
};

export const transFormData = (value) => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_LIST_ITEM_PENDING",
    });
    productList = [];
    value.forEach((element, index) => {
      let statusUpdate = false;
      let idxUpdate = 0;
      productList.forEach((val, idx) => {
        if (val.tanggal === element.tanggal && val.nama !== element.nama) {
          statusUpdate = true;
          idxUpdate = idx;
        }
      });
      if (statusUpdate) {
        updateData(element, idxUpdate);
      } else {
        pushData(element, index);
      }
    });
    const sum = productList.reduce(function (prev, current) {
      return prev + +current.total;
    }, 0);
    const data = {
      bulan: new Date().toLocaleString("id-ID", {
        month: "long",
      }),
      totalPerbulan: sum,
      hari: productList,
    };
    dispatch({
      type: "FETCH_LIST_ITEM_SUCCESS",
      payload: data,
    });
  };
};

export const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
