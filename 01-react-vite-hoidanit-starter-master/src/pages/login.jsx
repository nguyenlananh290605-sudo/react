import { Button, Input, Form, notification, Row, Col, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useState, useContext } from "react";
import { AuthContext } from "../components/context/auth.context";


const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        console.log(">>> check values", values)
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        }
        else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }
    return (


        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={6} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1.5px solid #ccc",
                    borderRadius: "5px"
                }}
                >
                    <legend >Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    //onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                type: "email",
                                message:
                                    'Enter a valid email address!',
                            }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your password!'
                            }]}
                        >
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === 'Enter') form.submit()
                            }} />
                        </Form.Item>
                        <Form.Item>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    loading={loading}
                                    onClick={() => form.submit()}
                                    type="primary" >
                                    Login
                                </Button>
                                <Link to="/">Go to homepage</Link>
                            </div>
                        </Form.Item>
                    </Form>


                    <Divider />
                    <div style={{ textAlign: "center" }}>Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link></div>

                </fieldset>

            </Col>
        </Row>
    )
}
export default LoginPage;

