import { useNavigate } from "react-router-dom"


import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { TbTent } from 'react-icons/tb'


export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <>

            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="home" className="fs-3">
                    < TbTent size={30} color="red" className="mb-1" />
                        Nomad Kitchen
                    </Navbar.Brand>
                    <Nav className="justify-content-end" >
                        <Nav.Link href="menu">
                            Our Menu
                        </Nav.Link>
                        <Nav.Link href="bookings">
                            My Bookings
                        </Nav.Link>
                        <Nav.Link href="book-now">
                            Book Now
                        </Nav.Link>
                        <Nav.Link href="/" onClick={() => {
                            localStorage.removeItem("nomad_user")
                            navigate({ replace: true })
                        }}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}