import React, { Suspense, lazy, useEffect, useState } from "react";
import { getData, submitData } from "./actions/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { transFormData } from "./modules/transformData";
import "./App.scss";

export const Header = lazy(() => import("./components/Header"));
export const Content = lazy(() => import("./components/Content"));
export const Create = lazy(() => import("./components/Create"));
const defaultForm = { nama: "", harga: 0 };

function App(p) {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState(defaultForm);
  const [show, setShow] = useState(false);
  const list = useSelector((state) => state.list);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (data?.length > 0) {
      dispatch(transFormData(data));
    }
  }, [data?.length]);

  useEffect(() => {
    if (list?.data?.length !== data?.length) {
      setData(list.data);
    }
  }, [list?.data, data?.length]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => dispatch(getData());
  const clearform = () => setPayload(defaultForm);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (payload.nama) {
      const data = {
        jam: new Date().toLocaleString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        tanggal: new Date().toLocaleString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        nama: payload.nama,
        pengeluaraan: Number(payload.harga),
      };
      submitData(data);
      clearform();
      setShow(false);
      setTimeout(() => {
        fetchData();
      }, 100);
    }
  };

  p = {
    handleClose,
    handleShow,
    handleSubmit,
    setPayload,
    payload,
    show,
  };

  return (
    <Suspense fallback={""}>
      <Header {...p} />
      <Content {...p} />
      <Create {...p} />
    </Suspense>
  );
}

export default App;
