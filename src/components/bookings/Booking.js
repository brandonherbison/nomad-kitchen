import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"



export const Booking = ({ bookingId, fullName, guestTotal, date, isApproved, occasion, price, location, time , getAllBookings, userId }) => {

    return <>
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>Reservation for {fullName}</Card.Title>
                <Card.Text>
                    Guests: {guestTotal}
                </Card.Text>
                <Card.Text>
                    Date: {date}
                </Card.Text>
                <Link to={`/bookings/${bookingId}/details`}>
                    <Button variant="outline-danger" >
                        Details
                    </Button>
                </Link>
                {
                    isApproved 
                    ? ""
                    : <><Button onClick={() => {

                        const copy = {
                            userId: userId,
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
                            .then(getAllBookings)
    
                    }} variant="outline-danger">Approve</Button>
                    </>
                }

            </Card.Body>
        </Card>
    </>
}