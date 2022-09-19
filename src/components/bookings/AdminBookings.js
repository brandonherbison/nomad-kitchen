import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
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
    <Container>
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

            ></Booking>

        )}

    </Container>
    </>
}
