import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Create(p) {
  return (
    <Modal show={p.show} onHide={() => p.handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Entri</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="form.ControlInput1">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              value={p.payload.nama}
              onChange={(e) =>
                p.setPayload({ ...p.payload, nama: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eform.ControlInput2">
            <Form.Label>Harga</Form.Label>
            <Form.Control
              type="number"
              value={p.payload.harga}
              onChange={(e) =>
                p.setPayload({ ...p.payload, harga: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => p.handleClose()}>
          Batal
        </Button>
        <Button variant="primary" onClick={(e) => p.handleSubmit(e)}>
          Kirim
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Create;
