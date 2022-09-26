import { useNavigate } from "react-router-dom"


import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { TbTent } from "react-icons/tb"
import { AiOutlineFolderOpen } from "react-icons/ai"
import { Col, Row } from "react-bootstrap"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { MdOutlineReviews } from "react-icons/md"




export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <>

            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="home" className="fs-3">
                        < TbTent size={30} color="red" className="mb-1" />
                        Nomad Kitchen
                    </Navbar.Brand>
                    <Nav className="justify-content-end gap-4" >
                    <Nav.Link href="/reviews">
                            <Col>
                                <Row>
                                    < MdOutlineReviews size={20} color="red" />
                                </Row>
                                <Row>
                                    All Reviews
                                </Row>
                            </Col>
                        </Nav.Link>
                        <Nav.Link href="bookings">
                            <Col>
                                <Row>
                                    < AiOutlineFolderOpen size={20} color="red" />
                                </Row>
                                <Row>
                                    All Bookings
                                </Row>
                            </Col>
                        </Nav.Link>
                        <Nav.Link href="/" onClick={() => {
                            localStorage.removeItem("nomad_user")
                            navigate({ replace: true })
                        }}>
                            <Col>
                                <Row>
                                    < RiLogoutCircleRLine size={20} color="red" />
                                </Row>
                                <Row>
                                    Logout
                                </Row>
                            </Col></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

















