
import { Container } from "react-bootstrap";
import IndexUser from "./screens/Admin/User/Index";
import IndexZone from "./screens/Admin/Zone/Index";
import IndexTicket from "./screens/Admin/Ticket/Index";
import HeaderAdmin from './components/Admin/Header';
import HeaderClient from './components/Client/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Client/Home';
import Profile from './components/Shared/Profile';
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
      <Route path="/profile" element={<Profile />} />
      <Route path="/*" element={<Home auth={auth} />} />
    </Routes>
  </>;
}
const ElseHeader = ({ auth }) => {
  return Number(auth.roleId) === 2 ?
    <HeaderSeller auth={auth} />
    :

    <HeaderClient auth={auth} />
}
const ElseView = ({ auth }) => {

  return (Number(auth.roleId) === 2 ? <SellerView auth={auth} /> : <ClientView auth={auth} />)
}

function App() {
  const auth = JSON.parse(localStorage.getItem('auth'))

  return (
    <>
      {
        Number(auth.roleId) === 1 ?
          <HeaderAdmin auth={auth} />
          :
          <ElseHeader auth={auth} />
      }
      <Container style={{
        marginTop: '60px'
      }}>
        {

          Number(auth.roleId) === 1 ?
            <AdminView auth={auth} /> :
            <ElseView auth={auth} />
        }
      </Container>
    </>
  );
}

export default App;
