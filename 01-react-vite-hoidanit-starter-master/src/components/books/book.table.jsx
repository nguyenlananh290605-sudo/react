import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import ViewDataDetail from './view.book.detail';
import { useState } from 'react';
import UpdateBookModalUncontrolled from './update.book.modal.uncontrolled';
import UpdateBookModal from './update.book.modal';


const BookTable = (props) => {
    const { dataBooks, loadBook,
        current, pageSize,
        setCurrent, setPageSize, total } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);


    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return <>{((index + 1) + (current - 1) * pageSize)}</>
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    >
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: "Tiêu đề",
            dataIndex: 'mainText',
        },
        {
            title: "Giá tiền",
            dataIndex: 'price',
            render: (value) => {
                if (value === undefined || value === null || isNaN(value)) {
                    return '0đ';
                }

                const formattedPrice = Number(value).toLocaleString('vi-VN');

                return `${formattedPrice}đ`;
            }
        },
        {
            title: "Số lượng",
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined
                            onClick={() => {
                                setDataUpdate(record);
                                setIsModalUpdateOpen(true);
                            }}
                            style={{ cursor: "pointer", color: "orange" }}
                        />

                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </div >
                )
            },
        }
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        //set
        //neu thay doi trang :current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }
        //neu thay doi pagesize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}

            />
            <UpdateBookModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            />
            {/* <UpdateBookModalUncontrolled
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            /> */}
            <ViewDataDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadBook={loadBook}
            />
        </>
    );
}
export default BookTable;