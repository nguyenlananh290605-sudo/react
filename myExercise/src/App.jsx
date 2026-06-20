import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SearchInput from './components/searchInput'
import { useEffect } from 'react'
import TitleList from './components/titleList'

function App() {

  const [query, setQuery] = useState("css")
  const [title, setTitle] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (searchQuery === "") {
      setTitle([])
      return;
    }
    fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
      .then(res => res.json()).then(data => {
        const fetchTitle = data.hits.map(item => item.title);
        setTitle(fetchTitle);
      })
      .catch(err => console.log("loi lay du lieu", err));
  }, [searchQuery])

  const handleSearch = () => {
    setSearchQuery(query);
  };
  return (
    <>
      <SearchInput value={query} onChange={setQuery} onSearch={handleSearch} />
      <TitleList titles={title}></TitleList>
    </>

  )
}

export default App
