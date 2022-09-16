import { useEffect, useState } from "react"
import { Button, Card, Col, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"




export const BookingDetails = () => {
    const { bookingId } = useParams()
    const [booking, updateBooking] = useState()
    const [starterChoices, updateStarterChoices] = useState()
    const [mainChoices, updateMainChoices] = useState()
    const [sideChoices, updateSideChoices] = useState()
    const [dessertChoices, updateDessertChoices] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/bookings/${bookingId}/?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    updateBooking(data)
                })
        }, [bookingId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/starterChoices?_expand=booking&_expand=starter&bookingId=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    updateStarterChoices(data)
                })
        }, [bookingId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/mainChoices?_expand=booking&_expand=main&bookingId=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    updateMainChoices(data)
                })
        }, [bookingId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/sideChoices?_expand=booking&_expand=side&bookingId=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    updateSideChoices(data)
                })
        }, [bookingId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/dessertChoices?_expand=booking&_expand=dessert&bookingId=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    updateDessertChoices(data)
                })
        }, [bookingId]
    )

    return <>
        <Container>
            <Card>
                <Card.Title>Reservation for {booking?.user?.fullName}</Card.Title>
                <Card.Body className="row">
                <Col className="1">
                    <Card.Text>
                        {booking?.guestTotal} guests
                    </Card.Text>
                    <Card.Text>
                        For: {booking?.occasion}
                    </Card.Text>
                    <Card.Text>
                        Address: {booking?.location}
                    </Card.Text>
                    <Card.Text>
                        Date: {booking?.date}
                    </Card.Text>
                </Col>
                <Col className="2">
                {
                    starterChoices?.map(starterChoice => 
                    <Card.Text key={`starterChoice--${starterChoice.id}`}>
                        {starterChoice?.quantity} {starterChoice?.starter?.name}
                    </Card.Text>
                    )
                }
                {
                    mainChoices?.map(mainChoice =>
                    <Card.Text key={`mainChoice--${mainChoice.id}`}>
                        {mainChoice?.quantity} {mainChoice?.main?.name}
                    </Card.Text>
                    )
                }
                {
                    sideChoices?.map(sideChoice =>
                    <Card.Text key={`sideChoice--${sideChoice.id}`}>
                        {sideChoice?.quantity} {sideChoice?.side?.name}
                    </Card.Text>
                    )
                }
                {
                    dessertChoices?.map(dessertChoice =>
                    <Card.Text key={`dessertChoice--${dessertChoice.id}`}>
                        {dessertChoice?.quantity} {dessertChoice?.dessert?.name}
                    </Card.Text>
                    )
                }
                </Col>
                </Card.Body>
                <Button href="/bookings">
                    Back
                </Button>
            </Card>
        </Container>
    </>
}