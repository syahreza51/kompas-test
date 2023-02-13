import { Card, CardBody, CardTitle } from "reactstrap";
import { useSelector } from "react-redux";
import { rupiah } from "../../modules/transformData";

import "./style.scss";

const Content = (props) => {
  const list = useSelector((state) => state.diariJajan.data);
  return (
    <div className="content">
      {list?.hari?.map((val, idx) => (
        <Card className="item" key={idx}>
          <CardBody>
            <CardTitle className="item-date">{val.tanggal}</CardTitle>
            <div className="item-line" />
            {val?.data.map((childVal, index) => (
              <>
                <div className="item-list" key={index}>
                  <p>{childVal.jam}</p>
                  <p>{childVal.nama}</p>
                  <p>{rupiah(childVal.pengeluaraan)}</p>
                </div>
                <div className="item-line" />
              </>
            ))}

            <div className="item-total">
              <label>Total: </label>
              {rupiah(val.total)}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Content;
