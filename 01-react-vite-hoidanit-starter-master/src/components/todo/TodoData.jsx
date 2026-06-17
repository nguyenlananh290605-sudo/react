const TodoData = (props) => {
    const { todoList, deleteTodo } = props; //destructuring
    const handleClick = (id) => {
        deleteTodo(id)
    }
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {

                return (
                    <div className={`todo-item ${index}`} key={item.id}>
                        <div> {item.name} </div>
                        <button
                            onClick={(event) => handleClick(item.id)}
                            style={{ cursor: "pointer" }}>
                            Delete
                        </button>
                    </div>
                )
            })}
        </div>
    )

}
export default TodoData;