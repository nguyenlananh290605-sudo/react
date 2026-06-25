import { useEffect, useState } from "react";
import { createBookAPI, handleUploadFile, updateBookAPI, updateUserAPI } from "../../services/api.service";
import { Input, notification, Modal, InputNumber, Select } from "antd"


const UpdateBookModal = (props) => {
    const [id, setId] = useState("");

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");


    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)


    const { isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, setDataUpdate, loadBook } = props;

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            if (dataUpdate && dataUpdate.thumbnail) {
                setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
            } else {
                setPreview(null)
            }
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
        let newThumbnail = dataUpdate ? dataUpdate.thumbnail : "";

        // Only upload file if user selected a new file
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

        const resBook = await updateBookAPI(
            id, newThumbnail, mainText, author, price, quantity, category
        );
        if (resBook.data) {
            resetAndCloseModal();
            await loadBook();
            notification.success({
                message: "Update book",
                description: "Update book thành công"
            });
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resBook.message)
            });
        }
    }

    // next dataUpdate != prev dataUpdate
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setCategory(dataUpdate.category);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            if (dataUpdate.thumbnail) {
                setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
            } else {
                setPreview(null);
            }
        }
    }, [dataUpdate])

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setMainText("");
        setId("");
        setAuthor("");
        setCategory("");
        setPrice(0);
        setQuantity(0);
        setSelectedFile(null);
        setPreview(null);
        setDataUpdate(null);
    }
    return (
        <Modal
            title="Update User"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}
        >

            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
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
    );
}


export default UpdateBookModal;