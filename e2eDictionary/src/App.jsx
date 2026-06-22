import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [query, setQuery] = useState("hello")
  const [searchQuery, setSearchQuery] = useState("")
  const [meaning, setMeaning] = useState([])

  useEffect(() => {
    if (searchQuery == "") {
      setResult([])
      return;
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/?query=${query}`)
      .then(res => res.json()).then(data => {
        const fetchTitle = data.hits.map(item => item.title);
        setTitle(fetchTitle);
      })
      .catch(err => console.log("loi lay du lieu", err));
  }, [searchQuery])


  return (

  )
}

export default App
