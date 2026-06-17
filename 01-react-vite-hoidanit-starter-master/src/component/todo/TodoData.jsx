const TodoData = (props) => {
    const { todoList } = props; //destructuring

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {

                return (
                    <div className={`todo-item ${index}`} key={item.id}>
                        <div> {item.name} </div>
                        <button>Delete</button>
                    </div>
                )
            })}
        </div>
    )

}
export default TodoData;