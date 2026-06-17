import './component/todo/todo.css'
import TodoNew from './component/todo/TodoNew'
import TodoData from './component/todo/TodoData'
import reactLogo from './assets/react.svg'
//() => {}  // arrow function
//component chu cai dau tien phai viet hoa
//component =html + css + js
const App = () => {
  const hoidan = "lan anh";
  const age = 25
  const data = {
    address: "ha noi",
    country: "viet nam"
  }
  //{key:value}

  const addNewTodo = (name) => {
    alert(`>>click me ${name}`);
  }

  return (
    <div className='todo-container'>
      <div className='todo-title'>Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        name={hoidan}
        age={age}
        data={data}
      />
      <div className='todo-image'>
        <img src={reactLogo} alt="Todo Image" />
      </div>
    </div>
  )
}

export default App
