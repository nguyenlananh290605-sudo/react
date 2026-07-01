import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { SearchOutlined, UserAddOutlined, TeamOutlined } from '@ant-design/icons'

function App() {
  const location = useLocation()

  const items = [
    {
      label: <Link to="/">Tìm kiếm</Link>,
      key: '/',
      icon: <SearchOutlined />,
    },
    {
      label: <Link to="/register">Tạo tài khoản</Link>,
      key: '/register',
      icon: <UserAddOutlined />,
    },
    {
      label: <Link to="/users">Danh sách tài khoản</Link>,
      key: '/users',
      icon: <TeamOutlined />,
    },
  ]

  return (

    <div>
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        items={items}
        style={{ justifyContent: 'center', marginBottom: '20px' }}
      />
      <div style={{ padding: '0 20px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
