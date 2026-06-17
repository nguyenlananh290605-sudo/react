const TodoData = (props) => {
    //props: object chua cac key:value tu App truyen vao
    //{
    //    name: "lan anh",
    //    age: 25,
    //    data: {}
    // }

    //const { name, age, data } = props; //destructuring

    //const name = props.name;
    //const age = props.age;
    //const data = props.data;


    console.log(">>check props: ", props);
    return (
        <div className='todo-data'>
            <div> My name is {name} </div>
            <div> Learning React</div>
            <div> Watching YouTube</div>
        </div>
    )

}
export default TodoData;