import { useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"



export const AdminBookings = () => {

    const [bookings, setBookings] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/bookings?_expand=user`)
                .then(response => response.json())
                .then((bookingArray) => {
                    setBookings(bookingArray)
                })
        }, []
    )

   

    return <>
    <Container>
        {bookings.map(booking => 
            <Card key={`booking--${booking.id}`} >
                <Card.Body>
                    <Card.Title>Reservation for {booking.user.fullName}</Card.Title>
                    <Card.Text>
                        Guests: {booking.guestTotal}
                    </Card.Text>
                    <Card.Text>
                        Date: {booking.date}
                    </Card.Text>
                    <Button variant="primary">Details</Button>
                    <Button variant="primary">Approve</Button>
                    <Button variant="primary">Deny</Button>
                </Card.Body>
            </Card>
        )}

    </Container>
    </>
}