import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from './components/About';
import Home from './components/Home';
import NoteState from './contexts/notes/NotesState';
import Login from './components/Login';
import AuthState from './contexts/auth/AuthState';
import SignUp from './components/SignUp';
import AlertState from './contexts/alert/AlertState';
import Alert from './components/Alert';
function App() {  
  return (
    <NoteState>
      <AuthState>
        <AlertState>
        <BrowserRouter>

        <Routes>
          <Route path="/" element={<>
            <Navbar />
            <Home />
          </>} />
          <Route path="/about" element={<>
            <Navbar />
            <About /></>} />
          <Route path="/login" element={<><Login /></>} />
          <Route path="/signup" element={<><SignUp /></>} />
        </Routes>
      </BrowserRouter>
        </AlertState>
      </AuthState>
     </NoteState>
  );
}

export default App;
