import { useNavigate } from "react-router-dom"


import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { TbTent } from 'react-icons/tb'
import { BiCalendarEdit, BiFoodMenu } from 'react-icons/bi'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { Col, Row } from "react-bootstrap"


export const CustomerNav = () => {
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
                        <Nav.Link href="menu">
                            <Col>
                                <Row>
                                    < BiFoodMenu size={20} color="red" />
                                </Row>
                                <Row>
                                    Our Menu
                                </Row>
                            </Col>
                        </Nav.Link>
                        <Nav.Link href="bookings">
                            <Col>
                                <Row>
                                    < AiOutlineFolderOpen size={20} color="red" />
                                </Row>
                                <Row>
                                    My Bookings
                                </Row>
                            </Col>
                        </Nav.Link>
                        <Nav.Link href="book-now">
                            <Col>
                                <Row>
                                    < BiCalendarEdit size={20} color="red" />
                                </Row>
                                <Row>
                                    Book Now
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