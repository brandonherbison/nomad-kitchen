import { Outlet, Route, Routes } from "react-router-dom"
import { BookingDetails } from "../bookings/BookingDetails"
import { Bookings } from "../bookings/Bookings"
import { Home } from "../Home"
import { Reviews } from "../reviews/Reviews"




export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>
                <Route path="bookings" element={< Bookings />} />
                <Route path="bookings/:bookingId/details" element={< BookingDetails />} />
                <Route path="home" element={< Home />} />
                <Route path="reviews" element={< Reviews />} />



            </Route>
        </Routes>
    )
}