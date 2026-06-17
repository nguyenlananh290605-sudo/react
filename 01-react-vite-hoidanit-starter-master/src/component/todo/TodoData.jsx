const TodoData = (props) => {
    //props: object chua cac key:value tu App truyen vao
    //{
    //    name: "lan anh",
    //    age: 25,
    //    data: {}
    // }

    const { todoList } = props; //destructuring

    //const name = props.name;
    //const age = props.age;
    //const data = props.data;


    console.log(">>check props: ", props);
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {

                return (
                    <div className="todo-item">
                        <div> {item.name} </div>
                        <button>Delete</button>
                    </div>
                )
            })}

            <div> {JSON.stringify(props.todoList)}</div>
        </div>
    )

}
export default TodoData;