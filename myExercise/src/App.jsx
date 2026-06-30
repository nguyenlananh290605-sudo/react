import { useState, useEffect } from 'react'
import './App.css'
import SearchInput from './components/searchInput'
import TitleList from './components/titleList'
import { useDispatch, useSelector } from 'react-redux'
import { addHistory, clearHistory } from './features/historySearchSlice'
import { Button, Modal } from 'antd'


function App() {
  const [query, setQuery] = useState('css')
  const [title, setTitle] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isView, setIsView] = useState(false)
  const [selectedHistory, setSelectedHistory] = useState(null)
  const dispatch = useDispatch()
  const historySearch = useSelector((state) => state.historySearch)

  useEffect(() => {
    if (searchQuery === '') {
      setTitle([])
      return
    }

    fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        const fetchTitle = data.hits.map((item) => item.title)
        setTitle(fetchTitle)
        // Lưu cả query và kết quả vào history
        dispatch(addHistory({ query: searchQuery, results: fetchTitle }))
      })
      .catch((err) => console.log('loi lay du lieu', err))
  }, [searchQuery])


  const handleSearch = () => {
    setSearchQuery(query)
  }


  return (
    <>
      <SearchInput value={query} onChange={setQuery} onSearch={handleSearch} />
      <TitleList titles={title}></TitleList>
      <div>
        <Button type="primary" onClick={() => setIsView(true)}>
          View History
        </Button>
      </div>

      {/* Modal 1: Danh sách lịch sử tìm kiếm */}
      <Modal
        title="Search History"
        open={isView}
        onCancel={() => setIsView(false)}
        width={700}
        footer={
          <Button type="primary" danger onClick={() => dispatch(clearHistory())}>
            Clear History
          </Button>
        }
      >
        {historySearch.value.length === 0 ? (
          <p>Không có lịch sử tìm kiếm.</p>
        ) : (
          <div className="history-list">
            {historySearch.value.map((item, index) => (
              <Button
                key={index}
                style={{ margin: 4 }}
                onClick={() => setSelectedHistory(item)}
              >
                {item.query}
              </Button>
            ))}
          </div>
        )}
      </Modal>

      {/* Modal 2: Kết quả của từ khóa đã chọn */}
      <Modal
        title={`Kết quả cho "${selectedHistory?.query}"`}
        open={selectedHistory !== null}
        onCancel={() => setSelectedHistory(null)}
        footer={null}
        width={700}
      >
        {selectedHistory && (
          <ul>
            {selectedHistory.results.map((result, i) => (
              <li key={i}>{result}</li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  )
}

export default App



