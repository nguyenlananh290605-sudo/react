import { Button, Input } from "antd"
import { SearchOutlined } from '@ant-design/icons';
import "./style.css"
const SearchInput = ({ value, onChange, onSearch }) => {
    return (
        <div className="input-search">
            <Input
                type="text"
                value={value}
                onChange={(event) => { onChange(event.target.value) }}
            />

            <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={onSearch}
            >
                Fetching
            </Button>

        </div>
    )
}
export default SearchInput;