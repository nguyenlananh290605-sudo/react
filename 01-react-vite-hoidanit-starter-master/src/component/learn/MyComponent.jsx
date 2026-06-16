//JSX = JavaScript XML
import './style.css'
const FakeComponent = () => {
    return (
        <div>
            fake component
        </div>
    )
}
//fragment = <> </>  // khong can them div bao quanh
const MyComponent = () => {

    return (
        <>
            <div> eric & lan anh update </div>
            <div className="my-class" style={{ borderRadius: '10px' }}> class </div>
        </>
    );
}

export default MyComponent;