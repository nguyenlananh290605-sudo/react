import './style.css';
const TitleList = ({ titles }) => {
    if (!titles || titles.length === 0) {
        return null;
    }

    return (
        <div className="title-container">
            {titles.map((title, index) => (
                <span key={index} className="title-item">
                    {title}
                </span>
            ))}
        </div>
    );
}
export default TitleList;