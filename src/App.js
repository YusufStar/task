import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import NoPage from "./pages/NoPage"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
    <div className='h-full w-screen flex flex-col bg-[#ececec]'>
    <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
