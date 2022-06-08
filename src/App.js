import './App.css';
import Navbar from './components/navbar/Navbar'
import LogIn from './views/LogIn'
import SignUp from './views/SignUp'
import Home from './views/Home';
import LandingPage from './views/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Shopping from './views/Shopping'
import { ReactNotifications } from 'react-notifications-component'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div className="App">
        <ReactNotifications/>
        <Router>
          <Navbar />
          <Container>
            <Row>
              <Col>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                  <Route path="/shopping" element={<ProtectedRoute><Shopping/></ProtectedRoute>}/>
                </Routes>
              </Col>
            </Row>
          </Container>
        </Router>
    </div>
  );
}

export default App;
