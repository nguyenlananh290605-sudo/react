import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Modal, notification } from "antd";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookModalUncontrolled = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadBook } = props;
    const [form] = Form.useForm();
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Sync dataUpdate to form when modal is opened or dataUpdate changes
    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                _id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            });
            // Show the existing thumbnail
            if (dataUpdate.thumbnail) {
                setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
            } else {
                setPreview(null);
            }
        }
    }, [dataUpdate, form]);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            // If there's an existing thumbnail, keep it, otherwise clear preview
            if (dataUpdate && dataUpdate.thumbnail) {
                setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
            } else {
                setPreview(null);
            }
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onFinish = async (values) => {
        const { _id, mainText, author, price, quantity, category } = values;
        let newThumbnail = dataUpdate ? dataUpdate.thumbnail : "";

        // If a new file is selected, upload it
        if (selectedFile) {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                });
                return;
            }
        } else if (!newThumbnail) {
            notification.error({
                message: "Error update book",
                description: "Vui lòng upload ảnh thumbnail"
            });
            return;
        }

        // Call the update API
        const resBook = await updateBookAPI(_id, newThumbnail, mainText, author, price, quantity, category);
        if (resBook.data) {
            resetAndCloseModal();
            await loadBook();
            notification.success({
                message: "Update book",
                description: "Cập nhật book thành công"
            });
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resBook.message)
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setDataUpdate(null);
        setSelectedFile(null);
        setPreview(null);
        form.resetFields();
    };

    return (
        <Modal
            title="Update Book (Uncontrolled)"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Id"
                    name="_id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="MainText"
                    name="mainText"
                    rules={[{ required: true, message: 'Vui lòng nhập MainText!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Author"
                    name="author"
                    rules={[{ required: true, message: 'Vui lòng nhập Author!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập Price!' }]}
                >
                    <InputNumber
                        suffix="đ"
                        style={{ width: '100%' }}
                        min={1}
                    />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: 'Vui lòng nhập Quantity!' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        min={1}
                    />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Vui lòng chọn Category!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },
                        ]}
                    />
                </Form.Item>

                <div>
                    <span>Thumbnail</span>
                    <div>
                        <label htmlFor='btnUpdateUpload' style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "green",
                            color: "white",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                            Upload
                        </label>
                        <input
                            type='file'
                            hidden
                            id='btnUpdateUpload'
                            onChange={(event => handleOnChangeFile(event))}
                            onClick={(event) => event.target.value = null}
                        />
                    </div>
                    {preview &&
                        <div style={{
                            marginTop: "10px",
                            marginBottom: "15px",
                            height: "100px",
                            width: "150px",
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                 src={preview} alt="preview" />
                        </div>
                    }
                </div>
            </Form>
        </Modal>
    );
};

export default UpdateBookModalUncontrolled;
