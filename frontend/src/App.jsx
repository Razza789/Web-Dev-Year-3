import Home from './pages/Home'
import Countries from './pages/Countries'
import Content from './pages/Content'
import Menu from './components/Menu'
import { Routes, Route} from "react-router-dom"
import SignIn from './components/SignIn'
import { useState } from 'react'

/**
 * Router
 * 
 * This will be the router for the website
 * it will be what displays the paths and for content, it will only show notes if its set to signedin
 * @author John Rooksby
 * @author Ryan Field
 */
function App() {

  const [signedIn, setSignedIn] = useState(false)

  return (
    <>
    <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
    <Menu />
 

    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/content" element={<Content signedIn={signedIn} />} />
      <Route path="*" element={<p>Not found</p>}/>
    </Routes>
    </>
  )
}

export default App;
