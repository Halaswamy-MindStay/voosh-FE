import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandinPage from './pages/components/landingPage';
import SignUp from './pages/components/signUp';
import Login from './pages/components/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/landingPage' element={<LandinPage />} />
      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
