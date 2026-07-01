import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUsers } from '../redux/user/user.slide';

import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

import UserCreateModal from './modal/user.create.modal';


function UsersTable() {

    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.user.listUsers)

    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchListUsers())
        toast.success("fetch success")
    }, [])


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
                <h4>Table Users</h4>
                <Button variant="primary"
                    onClick={() => setIsOpenCreateModal(true)}
                >Add New</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </Button>&nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(user)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <UserCreateModal
                isOpenCreateModal={isOpenCreateModal}
                setIsOpenCreateModal={setIsOpenCreateModal}
            />
        </>

    );
}

export default UsersTable;