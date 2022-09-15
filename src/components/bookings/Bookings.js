import { AdminBookings } from "./AdminBookings"
import { CustomerBookings } from "./CustomerBookings"




export const Bookings = () => {

	const localNomadUser = localStorage.getItem("nomad_user")
    const nomadUserObject = JSON.parse(localNomadUser)

	if (nomadUserObject.admin) {
		return <AdminBookings />
	}
	else {
		return <CustomerBookings />
	}

}