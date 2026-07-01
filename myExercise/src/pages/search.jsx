import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SearchInput from '../components/searchInput'
import TitleList from '../components/titleList'
import { addHistory } from '../features/historySearchSlice'

const SearchPage = () => {
  const [query, setQuery] = useState('css')
  const [title, setTitle] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchQuery === '') {
      setTitle([])
      return;
    }

    fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        const fetchTitle = data.hits.map((item) => item.title)
        setTitle(fetchTitle)
        dispatch(addHistory({ query: searchQuery, results: fetchTitle }))
      })
      .catch((err) => console.log('loi lay du lieu', err))
  }, [searchQuery])

  const handleSearch = () => {
    setSearchQuery(query)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Tìm Kiếm</h2>
      <SearchInput value={query} onChange={setQuery} onSearch={handleSearch} />
      <TitleList titles={title} />
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      </div>
    </div>
  )
}

export default SearchPage
