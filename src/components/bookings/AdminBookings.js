import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Booking } from "./Booking"






export const AdminBookings = () => {

    const [bookings, setBookings] = useState([])



    const getAllBookings = () => {

        fetch(`http://localhost:8088/bookings?_expand=user`)
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
    <Container className="bg-light py-5 ">
        <Row className="text-center">
            <h1>All Bookings</h1>
        </Row>
        <Col className="d-flex flex-column-reverse">
        {bookings.map(booking => <Booking key={`booking--${booking.id}`}
            bookingId={booking.id}
            fullName={booking.user.fullName}
            guestTotal={booking.guestTotal}
            date={booking.date}
            isApproved={booking.isApproved}
            occasion={booking.occasion}
            location={booking.location}
            price={booking.price}
            time={booking.time}
            getAllBookings={getAllBookings}
            userId={booking.userId}
            drinkPackage={booking.drinkPackage}

            ></Booking>

        )}
        </Col>

    </Container>
    </>
}
