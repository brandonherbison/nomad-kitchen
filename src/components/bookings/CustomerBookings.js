import { useEffect, useState } from "react"
import { Button, Card, Col, Container, FloatingLabel, Form, OverlayTrigger, Popover, Row } from "react-bootstrap"
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

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Hang Tight!</Popover.Header>
            <Popover.Body>
                An administrator is reviewing your request for a reservation. Thank you for booking with us!
            </Popover.Body>
        </Popover>
    )
    const popoverApproved = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">You're All Set!</Popover.Header>
            <Popover.Body>
                If you need to make further changes to your reservation please email us at info@nomadkitchen.com.
            </Popover.Body>
        </Popover>
    )


    return <>
        <Container className="mt-5">

            {
                bookings.length > 0
                    ? bookings.map(booking =>
                        <Card className="m-auto mb-3 shadow bg-light " key={`booking--${booking.id}`} style={{ width: '55rem' }}>
                            <Card.Body>
                                <Row>
                                    <Col className="col-9">
                                        <Card.Title>{booking.occasion}</Card.Title>
                                        <Card.Text>
                                            Date: {booking.date}
                                        </Card.Text>
                                        <Card.Text>
                                            Price: ${booking.price}.00
                                        </Card.Text>
                                        <Card.Text>
                                            Status: {
                                                booking.isApproved
                                                    ? <OverlayTrigger trigger="click" placement="right" overlay={popoverApproved}>
                                                        <Button variant="success" size="sm">Approved</Button>
                                                    </OverlayTrigger>
                                                    : <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                                        <Button variant="secondary" size="sm">Pending</Button>
                                                    </OverlayTrigger>
                                            }
                                        </Card.Text>
                                    </Col>
                                    <Col className="col-3 align-self-end">
                                        {
                                            booking.isApproved
                                                ? <Button href="/reviews" variant="outline-danger" size="lg" >
                                                    Leave us a review!
                                                </Button>
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