import { Table, Button, Modal, notification } from 'antd';
import { useState } from 'react';

const BookForm = (props) => {
    const { loadUser } = props
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleSubmitBtn = async () => {
    //     const res = await createUserAPI(fullName, email, password, phone)
    //     if (res.data) {
    //         notification.success({
    //             message: "Create user",
    //             description: "Tạo user thành công"
    //         })
    //         resetAndCloseModal();
    //         await loadUser();
    //     }
    //     else {
    //         notification.error({
    //             message: "Error create user",
    //             description: JSON.stringify(res.message)
    //         })
    //     }
    // }
    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Users</h3>
                    <Button
                        type="primary">
                        Create user
                    </Button>

                </div>

            </div>
            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                //onOk={handleOk}
                onCancel={resetAndCloseModal}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
export default BookForm;