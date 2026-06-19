import { Table } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserTable = () => {

    const [dataUsers, setDataUser] = useState([
        { _id: "lan anh", fullName: 25, email: "hn" },
        { _id: "anh", fullName: 55, email: "hcm" }
    ])

    useEffect(() => {
        console.log(">>>>> run useEffect 1111")
        loadUser()
    }, []);

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
        setDataUser(res.data)
    }
    console.log(">>>>run render 000")
    return (
        <Table
            columns={columns}
            dataSource={dataUsers}
            rowKey={"_id"}
        />
    )

}
export default UserTable;