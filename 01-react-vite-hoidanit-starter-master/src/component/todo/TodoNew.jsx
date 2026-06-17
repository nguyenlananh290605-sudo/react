const TodoNew = (props) => {
    console.log(">>check point: ", props);
    const { addNewTodo } = props; //destructuring
    // addNewTodo("lan anh"); //goi ham addNewTodo tu App truyen vao
    return (
        <div className='todo-new'>
            <input type="text" />
            <button> Add </button>
        </div>
    )
}
export default TodoNew;