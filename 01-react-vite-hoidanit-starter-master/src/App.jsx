import './component/todo/todo.css'
import TodoNew from './component/todo/TodoNew'
import TodoData from './component/todo/TodoData'
import reactLogo from './assets/react.svg'
//() => {}  // arrow function
//component chu cai dau tien phai viet hoa
//component =html + css + js
const App = () => {

  return (
    <div className='todo-container'>
      <div className='todo-title'>Todo List</div>
      <TodoNew />
      <TodoData />
      <div className='todo-image'>
        <img src={reactLogo} alt="Todo Image" />
      </div>
    </div>
  )
}

export default App
