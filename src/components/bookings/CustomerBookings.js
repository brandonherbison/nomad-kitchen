import { useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
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

            {bookings.map(booking =>
                <Card className="mt-2" key={`booking--${booking.id}`}>
                    <Card.Body>
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
                        {
                            booking.isApproved
                                ? ""
                                : <><Button variant="primary" onClick={() => {
                                    fetch(`http://localhost:8088/bookings/${booking.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(getAllBookings)
                                }}>Cancel</Button>
                                    <Link to={`/bookings/${booking.id}/edit`}>
                                        <Button variant="primary" >
                                            Edit
                                        </Button>
                                    </Link>
                                </>
                        }
                    </Card.Body>
                </Card>
            )}
        </Container>
    </>



}