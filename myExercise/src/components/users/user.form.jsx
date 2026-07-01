import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Radio, Select } from 'antd'
import { saveUser } from '../../features/userSlice'

const UserForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            staffCode: '',
            fullName: '',
            email: '',
            gender: '',
            province: ''
        }
    })

    const onSubmit = (data) => {
        dispatch(saveUser(data))
        reset() // Xoá trắng form sau khi submit thành công
        navigate('/users') // Điều hướng sang trang hiển thị danh sách người dùng
    }

    const provinces = [
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Hải Phòng', label: 'Hải Phòng' },
        { value: 'Cần Thơ', label: 'Cần Thơ' }
    ]

    return (
        <div style={{ maxWidth: '450px', margin: '20px auto' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Tạo Tài Khoản Người Dùng</h3>

            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                {/* Mã CB */}
                <Form.Item
                    label="Mã CB"
                    validateStatus={errors.staffCode ? 'error' : ''}
                    help={errors.staffCode?.message}
                    required
                >
                    <Controller
                        name="staffCode"
                        control={control}
                        rules={{ required: 'Mã CB không được để trống' }}
                        render={({ field }) => <Input {...field} placeholder="Nhập mã cán bộ" />}
                    />
                </Form.Item>

                {/* Họ tên */}
                <Form.Item
                    label="Họ và Tên"
                    validateStatus={errors.fullName ? 'error' : ''}
                    help={errors.fullName?.message}
                    required
                >
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: 'Họ và tên không được để trống' }}
                        render={({ field }) => <Input {...field} placeholder="Nhập họ và tên" />}
                    />
                </Form.Item>

                {/* Email */}
                <Form.Item
                    label="Email"
                    validateStatus={errors.email ? 'error' : ''}
                    help={errors.email?.message}
                    required
                >
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email không được để trống',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email không đúng định dạng'
                            }
                        }}
                        render={({ field }) => <Input {...field} placeholder="Nhập email" />}
                    />
                </Form.Item>

                {/* Giới tính */}
                <Form.Item
                    label="Giới tính"
                    validateStatus={errors.gender ? 'error' : ''}
                    help={errors.gender?.message}
                    required
                >
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: 'Vui lòng chọn giới tính' }}
                        render={({ field }) => (
                            <Radio.Group {...field}>
                                <Radio value="Nam">Nam</Radio>
                                <Radio value="Nữ">Nữ</Radio>
                                <Radio value="Khác">Khác</Radio>
                            </Radio.Group>
                        )}
                    />
                </Form.Item>

                {/* Tỉnh thành */}
                <Form.Item
                    label="Tỉnh thành"
                    validateStatus={errors.province ? 'error' : ''}
                    help={errors.province?.message}
                    required
                >
                    <Controller
                        name="province"
                        control={control}
                        rules={{ required: 'Vui lòng chọn tỉnh thành' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Chọn tỉnh/thành"
                                options={provinces}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UserForm
