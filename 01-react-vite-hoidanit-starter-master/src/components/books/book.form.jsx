import { Table, Button, Modal, notification, Input, Select, InputNumber } from 'antd';
import { useState } from 'react';
import { createBookAPI, handleUploadFile } from '../../services/api.service';

const BookForm = (props) => {
    const { loadBook } = props
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");

    const [isCreateOpen, setIsCreateOpen] = useState(false);


    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }
    const handleSubmitBtn = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui long upload anh thumbnail"
            })
            return;
        }

        //upload file
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            //success
            const newThumbnail = resUpload.data.fileUploaded;
            const resBook = await createBookAPI(newThumbnail,
                mainText, author, price, quantity, category
            )
            if (resBook.data) {
                resetAndCloseCreate();
                await loadBook();
                notification.success({
                    message: "Create book",
                    description: "Tao book moi thanh cong"
                })
            }
            else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            //failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }


    }
    const resetAndCloseCreate = () => {
        setIsCreateOpen(false);
        setMainText("");
        setAuthor("");
        setPrice(0);
        setQuantity(0);
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
        setIsCreateOpen(false);
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Books</h3>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        type="primary">
                        Create book
                    </Button>

                </div>
                <Modal
                    title="Create Book"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isCreateOpen}
                    onOk={() => handleSubmitBtn()}
                    onCancel={() => resetAndCloseCreate()}
                    maskClosable={false}
                    okText={"Create"}
                >

                    <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                        <div>
                            <span>MainText</span>
                            <Input
                                value={mainText}
                                onChange={(event) => { setMainText(event.target.value) }}
                            />
                        </div>
                        <div>
                            <span>Author</span>
                            <Input
                                value={author}
                                onChange={(event) => { setAuthor(event.target.value) }}
                            />
                        </div>
                        <div >
                            <span>Price</span>
                            <InputNumber
                                suffix="đ"
                                style={{ width: '100%' }}
                                min={1} max={5} defaultValue={3}
                                onChange={(event) => { setPrice(event) }}
                            />
                        </div>
                        <div >
                            <span>Quantity</span>
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1} defaultValue={3}
                                onChange={(event) => { setQuantity(event) }}
                            />
                        </div>
                        <div  >
                            <span>Category</span>
                            <Select
                                defaultValue="Business"
                                style={{ width: '100%' }}
                                onChange={(event) => { setCategory(event) }}
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
                        </div>
                        <div>
                            <span>Thumbnail</span>
                            <div>
                                <label htmlFor='btnUpload' style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "green",
                                    borderRadius: "5px",
                                    cursor: "pointer"

                                }}>
                                    Upload
                                </label>
                                <input
                                    type='file' hidden id='btnUpload'
                                    //onChange={handleOnChangeFile}
                                    onChange={(event => handleOnChangeFile(event))}
                                    onClick={(event) => event.target.value = null}
                                ></input>
                            </div>
                            {preview &&
                                <>
                                    <div style={{
                                        marginTop: "10px",
                                        marginBottom: "15px",
                                        height: "100px",
                                        width: "150px",

                                    }}>
                                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                            src={preview} />
                                    </div>

                                </>
                            }
                        </div>
                    </div>
                </Modal>
            </div >
        </div >
    )
}
export default BookForm;