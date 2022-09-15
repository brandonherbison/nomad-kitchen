import { useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"




export const CustomerBookings = ({currentUser}) => {

    const [bookings, setBookings] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/bookings?_expand=user&userId=${currentUser.id}`)
                .then(response => response.json())
                .then((bookingArray) => {
                    setBookings(bookingArray)
                })
        }, []
    )


        return <>
        <Container>

            {bookings.map(booking => 
                <Card key={`booking--${booking.id}`}>
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
                        <Button variant="primary">Cancel</Button>
                        <Button variant="primary">Edit</Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    </>
    


}