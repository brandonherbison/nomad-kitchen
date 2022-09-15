import { Outlet, Route, Routes } from "react-router-dom"
import { Bookings } from "../bookings/Bookings"




export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Nomad Kitchen</h1>

                    <Outlet />
                </>
            }>
                <Route path="bookings" element={< Bookings />} />



            </Route>
        </Routes>
    )
}