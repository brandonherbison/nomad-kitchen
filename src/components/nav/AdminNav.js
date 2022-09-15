import { useNavigate } from "react-router-dom"


import "bootstrap/dist/css/bootstrap.min.css"
import  Navbar  from "react-bootstrap/Navbar"
import  Container  from "react-bootstrap/Container"
import  Nav  from "react-bootstrap/Nav"


export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <>

      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Nomad Kitchen
          </Navbar.Brand>
          <Nav className="justify-content-end" >
            <Nav.Link href="bookings">
                Bookings
            </Nav.Link>
            <Nav.Link href="/" onClick={() => {
                localStorage.removeItem("nomad_user")
                navigate({replace: true})}}>
                Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    )
}

















