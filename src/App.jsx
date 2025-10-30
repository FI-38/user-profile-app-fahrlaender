import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import UserAppNav from "./components/UserAppNav";
import Container from "react-bootstrap/Container";
import { useState} from "react";
import FakeToggleLoginButton from "./components/FakeToggleLoginButton";
import Login from "./components/Login";
import "./App.css";
import GeekJoke from "./components/GeekJoke";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Router>
      <FakeToggleLoginButton isLoggedIn={isLoggedIn} onToggle={handleToggleLogin} />

      <UserAppNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/joke" element={<GeekJoke />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          } />
          <Route path="/logout" element={<Home />} />
 
        </Routes>
      </Container> 
    </Router>
  );
}
export default App









  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )



