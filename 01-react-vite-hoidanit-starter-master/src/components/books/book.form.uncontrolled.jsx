import { Button, Modal, notification, Input, Select, InputNumber, Form } from 'antd';
import { useState } from 'react';
import { createBookAPI, handleUploadFile } from '../../services/api.service';

const BookFormUncontrolled = (props) => {
    const { loadBook } = props;
    const [form] = Form.useForm();

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setPreview(null);
            form.setFieldValue("thumbnail", null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            form.setFieldValue("thumbnail", file);
            // Re-trigger validation for thumbnail to clear the warning message instantly
            form.validateFields(["thumbnail"]);
        }
    }

    const onFinish = async (values) => {
        const { mainText, author, price, quantity, category, thumbnail } = values;

        // Upload file
        const resUpload = await handleUploadFile(thumbnail, "book");
        if (resUpload.data) {
            // Success
            const newThumbnail = resUpload.data.fileUploaded;
            const resBook = await createBookAPI(
                newThumbnail,
                mainText,
                author,
                price,
                quantity,
                category
            );
            if (resBook.data) {
                resetAndCloseCreate();
                await loadBook();
                notification.success({
                    message: "Create book",
                    description: "Tạo book mới thành công"
                });
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                });
            }
        } else {
            // Failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            });
        }
    }

    const resetAndCloseCreate = () => {
        form.resetFields();
        setPreview(null);
        setIsCreateOpen(false);
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Books (Uncontrolled Form)</h3>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        type="primary"
                    >
                        Create book
                    </Button>
                </div>
                <Modal
                    title="Create Book (Uncontrolled)"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isCreateOpen}
                    onOk={() => form.submit()}
                    onCancel={() => resetAndCloseCreate()}
                    maskClosable={false}
                    okText={"Create"}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            price: 3,
                            quantity: 3,
                            category: "Business"
                        }}
                    >
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

                        <Form.Item
                            label="Thumbnail"
                            name="thumbnail"
                            rules={[{ required: true, message: 'Vui lòng chọn Thumbnail!' }]}
                        >
                            <div>
                                <label htmlFor='btnUpload' style={{
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
                                    id='btnUpload'
                                    style={{ display: "none" }}
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
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default BookFormUncontrolled;
