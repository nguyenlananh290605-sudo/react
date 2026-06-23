
import Header from './layout/header'
import Footer from './layout/footer'
import { Outlet } from 'react-router-dom'

const ParentComponent = (props) => {
  console.log("check props parent", props)
  return (
    <>
      <div>{props.children}</div>
      <div>parent component</div>
    </>

  )
}

const ChildComponent = (props) => {
  return (
    <div>child component</div>
  )
}

const App = () => {

  return (
    <>
      {/* <ParentComponent /> */}
      <ParentComponent>
        <ChildComponent />
      </ParentComponent>
      <Header />
      <Outlet />
      <Footer />
    </>

  )
}

export default App
