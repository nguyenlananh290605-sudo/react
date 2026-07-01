import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'antd'
import { clearHistory } from '../features/historySearchSlice.js'

const SearchHistory = () => {
  const [isView, setIsView] = useState(false)
  const [selectedHistory, setSelectedHistory] = useState(null)
  const dispatch = useDispatch()
  const historySearch = useSelector((state) => state.historySearch)

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setIsView(true)}>
          View History
        </Button>
      </div>
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

export default SearchHistory
