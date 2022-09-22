import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"




export const CustomerBookings = ({ currentUser }) => {

    const [bookings, setBookings] = useState([])


    const getAllBookings = () => {

        fetch(`http://localhost:8088/bookings?_expand=user&userId=${currentUser.id}`)
            .then(response => response.json())
            .then((bookingArray) => {
                setBookings(bookingArray)
            })
    }

    useEffect(
        () => {
            getAllBookings()
        }, []
    )


    return <>
        <Container className="mt-5">

            {
                bookings.length > 0
                    ? bookings.map(booking =>
                        <Card className="m-auto shadow bg-light" key={`booking--${booking.id}`} style={{ width: '55rem' }}>
                            <Card.Body>
                                <Row>
                                    <Col className="col-9">
                                        <Card.Title>Reservation for {booking.guestTotal} guests</Card.Title>
                                        <Card.Text>
                                            Guests: {booking.guestTotal}
                                        </Card.Text>
                                        <Card.Text>
                                            Date: {booking.date}
                                        </Card.Text>
                                        <Card.Text>
                                            Price: ${booking.price}.00
                                        </Card.Text>
                                        <Card.Text>
                                            Status: {
                                                booking.isApproved
                                                    ? "Approved"
                                                    : "Pending"
                                            }
                                        </Card.Text>
                                    </Col>
                                    <Col className="col-3 align-self-end">
                                        {
                                            booking.isApproved
                                                ? ""
                                                : <><Button variant="outline-danger px-3" className="float-end" onClick={() => {
                                                    fetch(`http://localhost:8088/bookings/${booking.id}`, {
                                                        method: "DELETE"
                                                    })
                                                        .then(getAllBookings)
                                                }}>Cancel</Button>
                                                    <Link to={`/bookings/${booking.id}/edit`}>
                                                        <Button variant="outline-danger mx-3 px-3" className="float-end" >
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                </>
                                        }
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    )
                    : <Card>
                        <Card.Body className="text-center">
                            No Bookings Yet!
                        </Card.Body>
                    </Card>
            }
        </Container>
    </>



}