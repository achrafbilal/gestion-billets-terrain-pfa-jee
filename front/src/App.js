
import { Container } from "react-bootstrap";
import IndexUser from "./screens/Admin/User/Index";
import IndexZone from "./screens/Admin/Zone/Index";
import IndexTicket from "./screens/Admin/Ticket/Index";
import HeaderAdmin from './components/Admin/Header';
import HeaderClient from './components/Client/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Client/Home';
import IndexSeats from './screens/Seller/IndexSeats';
import HeaderSeller from './components/Seller/Header';
const SellerView = () => {

  return <>
    <Routes>
      <Route path="/*" element={<IndexSeats />} />
    </Routes>
  </>;
}
const AdminView = () => {
  return <>
    <Routes>
      <Route path="/zones" element={<IndexZone />} />
      <Route path="/tickets" element={<IndexTicket />} />
      <Route path="/*" element={<IndexUser />} />
    </Routes>
  </>;
}

const ClientView = ({ auth }) => {
  return <>
    <Routes>
      <Route path="/*" element={<Home auth={auth} />} />
    </Routes>
  </>;
}


function App({ auth, logout }) {


  return (
    <>
      {Number(auth.roleId) === 1 &&
        <HeaderAdmin auth={auth} logout={logout} />}
      {Number(auth.roleId) === 2 &&
        <HeaderSeller auth={auth} logout={logout} />}
      {Number(auth.roleId) === 3 &&
        <HeaderClient auth={auth} logout={logout} />}

      <Container style={{
        marginTop: '60px'
      }}>
        {
          Number(auth.roleId) === 1 &&
          <AdminView auth={auth} />
        }
        {
          Number(auth.roleId) === 2 &&
          <SellerView auth={auth} />
        }
        {
          Number(auth.roleId) === 3 &&
          <ClientView auth={auth} />
        }
      </Container>
    </>
  );
}

export default App;
