import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from './components/Header/index';
import MainPage from './pages/MainPage/index';


const App = () => {
  return (
    <BrowserRouter >
      <Header/>

      <Routes>
        <Route path="/" element={<MainPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
