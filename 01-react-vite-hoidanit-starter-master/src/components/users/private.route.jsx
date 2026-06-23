import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    // return (
    //     <Navigate to="/login" replace />
    // )
    return (
        <Result
            status="404"
            title="Unauthorize"
            subTitle="Bạn cần đăng nhập để truy cập"
            extra={<Button type="primary">
                <Link to='/'>
                    <span>
                        Back to homepage
                    </span>
                </Link>
            </Button>}
        />
    )
}
export default PrivateRoute;