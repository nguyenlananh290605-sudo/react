import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import UpdateUserModal from "./update.user.modal"
const UserTable = (props) => {
    const { dataUsers, loadUser } = props
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',

        },
        {
            title: 'fullName',
            dataIndex: 'fullName',

        },
        {
            title: 'Email',
            dataIndex: 'email',

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
                            style={{ cursor: "pointer", color: "orange" }} />
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </div>
                )
            },
        },

    ];
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}

            />
        </>

    )

}
export default UserTable;