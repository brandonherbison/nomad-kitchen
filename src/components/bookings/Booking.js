import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"



export const Booking = ({ bookingId, fullName, guestTotal, date, isApproved, occasion, price, location, time }) => {

    return <>
        <Card>
            <Card.Body>
                <Card.Title>Reservation for {fullName}</Card.Title>
                <Card.Text>
                    Guests: {guestTotal}
                </Card.Text>
                <Card.Text>
                    Date: {date}
                </Card.Text>
                <Link to={`/bookings/${bookingId}/details`}>
                    <Button variant="primary" >
                        Details
                    </Button>
                </Link>
                {
                    isApproved 
                    ? ""
                    : <><Button onClick={() => {

                        const copy = {
                            userId: 1,
                            guestTotal: guestTotal,
                            location: location,
                            occasion: occasion,
                            date: date,
                            time: time,
                            price: price,
                            isApproved: true
                        }
                        fetch(`http://localhost:8088/bookings/${bookingId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(copy)
                        })
                            .then(response => response.json())
    
                    }} variant="primary">Approve</Button>
                    </>
                }

            </Card.Body>
        </Card>
    </>
}