import { useState } from "react";

const TodoNew = (props) => {

    //console.log(">>check point: ", props);
    const { addNewTodo } = props; //destructuring
    // addNewTodo("lan anh"); //goi ham addNewTodo tu App truyen vao

    //useState  hook
    //const valueInput="lan anh"
    const [valueInput, setValueInput] = useState("lan anh")
    const handleClick = () => {
        console.log(">>>check value input", valueInput)
    }
    const handleOnChange = (name) => {
        setValueInput(name)

    }
    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
            />
            <button style={{ cursor: 'pointer' }}
                onClick={handleClick}
            > Add </button>
            <div>
                My text input is {valueInput}
            </div>
        </div>
    )
}
export default TodoNew;