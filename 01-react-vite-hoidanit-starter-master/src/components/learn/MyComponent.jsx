//JSX = JavaScript XML
import './style.css'
//const name = "lan anh 1"
//const name = "25"
//const name = true
//const name = undefined
//const name = null

//const name = [1, 2, 3]
const name = {
    name: "lan anh",
    age: 25
}
//fragment = <> </>  // khong can them div bao quanh
const MyComponent = () => {

    return (
        <>
            <div> eric & {JSON.stringify(name)} update </div>
            <div className="my-class" style={{ borderRadius: '10px' }}> class </div>
        </>
    );
}

export default MyComponent;