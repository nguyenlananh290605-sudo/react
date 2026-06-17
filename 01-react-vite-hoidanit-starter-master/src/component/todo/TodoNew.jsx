const TodoNew = (props) => {
    console.log(">>check point: ", props);
    const { addNewTodo } = props; //destructuring
    // addNewTodo("lan anh"); //goi ham addNewTodo tu App truyen vao

    const handleClick = () => {
        alert(">>click me");
    }
    const handleOnChange = (name) => {
        console.log(">>handle onChange: ", name);
    }
    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
            />
            <button style={{ cursor: 'pointer' }}
                onClick={handleClick}
            > Add </button>
        </div>
    )
}
export default TodoNew;