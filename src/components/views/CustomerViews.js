import { Outlet, Route, Routes } from "react-router-dom"
import { BookingEdit } from "../bookings/BookingEdit"
import { BookingForm } from "../bookings/BookingForm"
import { Bookings } from "../bookings/Bookings"
import { Home } from "../Home"
import { Inbox } from "../Inbox"
import { Menu } from "../Menu"
import { Reviews } from "../reviews/Reviews"




export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>

                <Route path="menu" element={ < Menu /> } />
                <Route path="book-now" element={ < BookingForm /> } />
                <Route path="bookings" element={ < Bookings /> } />
                <Route path="bookings/:bookingId/edit" element={< BookingEdit />} />
                <Route path="home" element={< Home />} />
                <Route path="reviews" element={< Reviews />} />
                <Route path="inbox" element={< Inbox />} />


            </Route>
        </Routes>
    )
}