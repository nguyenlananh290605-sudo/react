import { Flex, Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useState } from 'react';

const UserTable = () => {

    const [dataUsers, setDataUser] = useState([
        { _id: "lan anh", fullName: 25, email: "hn" },
        { _id: "anh", fullName: 55, email: "hcm" }
    ])
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

    ];

    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        //setDataUser(res.data)
    }
    loadUser()
    console.log(">>>>run")
    return (
        <Table columns={columns} dataSource={dataUsers} />
    )

}
export default UserTable;