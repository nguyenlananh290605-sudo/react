import { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import { createNewUser } from "../../redux/user/user.slide";

const UserCreateModal = (props: any) => {

    const { isOpenCreateModal, setIsOpenCreateModal } = props;
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        if (!email) {
            alert("email empty");
            return;
        }
        if (!name) {
            alert("name empty");
            return;
        }
        //goi api => call redux =>action =>dispatch
        dispatch(createNewUser({ email, name }))
    }
    return (
        <Modal
            show={isOpenCreateModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenCreateModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add A New User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    label="Email"
                    className="mb-3"
                >
                    <Form.Control
                        type="email" placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel label="Name">
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsOpenCreateModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Save
                </Button>


            </Modal.Footer>
        </Modal >
    )

}
export default UserCreateModal;