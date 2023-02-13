import { Button } from "reactstrap";
import { useSelector } from "react-redux";
import { rupiah } from "../../modules/transformData";
import "./style.scss";

const Header = (p) => {
  const list = useSelector((state) => state.diariJajan.data);
  return (
    <div className="header">
      <h4>Diari Jajan Februari 2023</h4>
      <p>Pengeluaran Bulan Ini {rupiah(list?.totalPerbulan || 0)}</p>
      <Button color="primary" onClick={() => p.handleShow()}>
        Tambah Item
      </Button>
    </div>
  );
};
export default Header;
