
import Header from './layout/header'
import Footer from './layout/footer'
import { Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { getAccountAPI } from './services/api.service'
import { AuthContext } from './components/context/auth.context'

const App = () => {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo();
  }, [])
  const delay = (miliSeconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, miliSeconds)
    })
  }
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    await delay(3000);
    if ((await res).data) {
      //success
      setUser(res.data.user)
      console.log(">>>check user data: ", res.data)
    }
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>

  )
}

export default App
