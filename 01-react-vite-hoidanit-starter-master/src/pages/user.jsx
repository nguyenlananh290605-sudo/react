import UserForm from "../components/users/user.form";
import UserTable from "../components/users/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';

const UserPage = () => {
    const [dataUsers, setDataUser] = useState([])

    useEffect(() => {
        console.log(">>>>> run useEffect 1111")
        loadUser()
    }, []);
    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        setDataUser(res.data)
    }
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} />
        </div>
    )
}
export default UserPage;