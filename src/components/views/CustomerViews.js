import { Outlet, Route, Routes } from "react-router-dom"
import { BookingForm } from "../bookings/BookingForm"
import { Bookings } from "../bookings/Bookings"
import { Menu } from "../Menu"




export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Nomad Kitchen</h1>

                    <Outlet />
                </>
            }>

                <Route path="menu" element={ < Menu /> } />
                <Route path="book-now" element={ < BookingForm /> } />
                <Route path="bookings" element={ < Bookings /> } />

            </Route>
        </Routes>
    )
}