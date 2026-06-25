import './todo.css'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { fetchAllUserAPI, fetchAllBookAPI } from '../../services/api.service'
import { Input, Button, Tooltip } from 'antd'
import { 
  BookOutlined, 
  UserOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  CheckCircleOutlined,
  CalendarOutlined,
  AppstoreOutlined
} from '@ant-design/icons'

const TodoApp = () => {
  const { user } = useContext(AuthContext);
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Tìm hiểu kiến thức React nâng cao" },
    { id: 2, name: "Hoàn thiện giao diện quản trị Admin" },
    { id: 3, name: "Đọc sách lập trình mỗi ngày" }
  ]);
  const [newTodoName, setNewTodoName] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const resUsers = await fetchAllUserAPI(1, 1);
      if (resUsers && resUsers.data && resUsers.data.meta) {
        setTotalUsers(resUsers.data.meta.total);
      } else {
        setTotalUsers(5); // mock fallback
      }
    } catch (e) {
      setTotalUsers(5); // fallback
    }

    try {
      const resBooks = await fetchAllBookAPI(1, 1);
      if (resBooks && resBooks.data && resBooks.data.meta) {
        setTotalBooks(resBooks.data.meta.total);
      } else {
        setTotalBooks(12); // mock fallback
      }
    } catch (e) {
      setTotalBooks(12); // fallback
    }
  };

  const addNewTodo = () => {
    if (!newTodoName.trim()) return;
    const newTodo = {
      id: Math.floor(Math.random() * 10000000000),
      name: newTodoName.trim()
    }
    setTodoList([...todoList, newTodo])
    setNewTodoName("")
  }

  const deleteTodo = (id) => {
    const updated = todoList.filter(item => item.id !== id)
    setTodoList(updated)
  }

  return (
    <div className="home-container">
      {/* Hero Welcome Banner */}
      <div className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">Chào mừng bạn trở lại</span>
          <h1 className="hero-title">
            Chào mừng {user?.fullName || "Khách"}, đến với Book Store
          </h1>
          <p className="hero-subtitle">
            Hệ thống quản trị và phân tích dữ liệu cửa hàng sách. Bạn có thể theo dõi số lượng người dùng, quản lý đầu sách và sắp xếp công việc cá nhân dễ dàng.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-blue">
            <UserOutlined />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalUsers}</span>
            <span className="stat-label">Tổng số User</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-purple">
            <BookOutlined />
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalBooks}</span>
            <span className="stat-label">Tổng số Sách</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-emerald">
            <CheckCircleOutlined />
          </div>
          <div className="stat-info">
            <span className="stat-value">{todoList.length}</span>
            <span className="stat-label">Nhiệm vụ cần làm</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper icon-orange">
            <CalendarOutlined />
          </div>
          <div className="stat-info">
            <span className="stat-value">Hoạt động</span>
            <span className="stat-label">Hôm nay</span>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="dashboard-layout">
        {/* Todo Panel */}
        <div className="todo-panel">
          <div className="panel-header">
            <div className="panel-title">
              <CheckCircleOutlined style={{ color: '#7c3aed' }} />
              <span>Danh sách công việc</span>
            </div>
            <span className="panel-badge">{todoList.length} Tasks</span>
          </div>

          <div className="todo-input-group">
            <Input
              placeholder="Thêm nhiệm vụ mới..."
              value={newTodoName}
              onChange={(e) => setNewTodoName(e.target.value)}
              onPressEnter={addNewTodo}
              size="large"
              style={{ borderRadius: '12px' }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addNewTodo}
              size="large"
              style={{
                borderRadius: '12px',
                background: '#7c3aed',
                borderColor: '#7c3aed',
                height: 'auto'
              }}
            >
              Thêm
            </Button>
          </div>

          {todoList.length > 0 ? (
            <div className="todo-list-container">
              {todoList.map((item) => (
                <div className="todo-card-item" key={item.id}>
                  <div className="todo-item-content">
                    <CheckCircleOutlined style={{ color: '#cbd5e1', fontSize: '18px' }} />
                    <span className="todo-item-text">{item.name}</span>
                  </div>
                  <Tooltip title="Xóa nhiệm vụ">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => deleteTodo(item.id)}
                      style={{ borderRadius: '8px' }}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
          ) : (
            <div className="todo-empty-state">
              <div className="empty-image-container">
                <AppstoreOutlined />
              </div>
              <p className="empty-text">Tuyệt vời! Không còn công việc nào chưa hoàn thành.</p>
            </div>
          )}
        </div>

        {/* Feature Highlights panel */}
        <div className="features-panel">
          <div className="info-card">
            <h3 className="info-card-title">Tính năng hệ thống</h3>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-number">1</div>
                <div>
                  <h4 className="feature-text-title">Quản lý người dùng</h4>
                  <p className="feature-text-desc">Xem danh sách, thêm mới, cập nhật thông tin và phân quyền tài khoản quản trị viên.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-number">2</div>
                <div>
                  <h4 className="feature-text-title">Quản lý sách trực quan</h4>
                  <p className="feature-text-desc">Kiểm soát danh mục sách, số lượng tồn kho, giá cả và upload hình ảnh bìa sách tiện lợi.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-number">3</div>
                <div>
                  <h4 className="feature-text-title">Bảo mật tối ưu</h4>
                  <p className="feature-text-desc">Cơ chế xác thực JWT, phân luồng tuyến đường (Private Route) đảm bảo dữ liệu luôn được an toàn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoApp;