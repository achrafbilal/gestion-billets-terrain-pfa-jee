
import { Container } from "react-bootstrap";
import IndexUser from "./screens/Admin/User/Index";
import IndexSeat from "./screens/Admin/Seat/Index";
import IndexZone from "./screens/Admin/Zone/Index";
import IndexTicket from "./screens/Admin/Ticket/Index";
import HeaderAdmin from './components/Admin/Header';
import HeaderClient from './components/Client/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Client/Home';
import IndexClientSeat from './screens/Client/Index';
import Profile from './components/Shared/Profile';
function App() {
  const auth = JSON.parse(localStorage.getItem('auth'))
  return (
    <>
      {
        Number(auth.role) === 1 ?
          <HeaderAdmin auth={auth} />
          :
          <HeaderClient auth={auth} />
      }
      <Container >
        <Routes>
          {

            Number(auth.role) === 1 ?
              <>
                <Route path="/zones" element={<IndexZone />} />
                <Route path="/seats" element={<IndexSeat />} />
                <Route path="/tickets" element={<IndexTicket />} />
                <Route path="/*" element={<IndexUser />} />
              </> :
              <>
                <Route path="/seats" element={<IndexClientSeat />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/*" element={<Home />} />
              </>
          }
        </Routes>
      </Container>
    </>
  );
}

export default App;
