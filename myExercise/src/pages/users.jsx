import { useSelector } from 'react-redux'
import { Table } from 'antd'

const UsersPage = () => {
  const usersList = useSelector((state) => state.user.value)

  const columns = [
    { title: 'Mã CB', dataIndex: 'staffCode', key: 'staffCode' },
    { title: 'Họ và Tên', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    { title: 'Tỉnh thành', dataIndex: 'province', key: 'province' }
  ]

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Danh sách tài khoản đã tạo</h3>
      <Table
        dataSource={usersList}
        columns={columns}
        rowKey={(record, index) => record.staffCode + '-' + index}
        pagination={false}
        locale={{ emptyText: 'Chưa có tài khoản nào được tạo.' }}
      />
    </div>
  )
}

export default UsersPage
