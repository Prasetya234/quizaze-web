import { useState } from "react";
import {Modal, Button, Form } from "react-bootstrap"

const Index = ({show, handleClose, handleSubmit}) => {
  const [username, setUsername] = useState("")
  const submit = ()=> {
    handleSubmit(username)
    setUsername("")
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Authentfikasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
              value={username}
                placeholder="Danang Silfa"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={submit}>
            Main
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Index;