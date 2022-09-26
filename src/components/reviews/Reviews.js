import { AdminReviews } from "./AdminReviews"
import { CustomerReviews } from "./CustomerReviews"



export const Reviews = () => {
	const localNomadUser = localStorage.getItem("nomad_user")
    const nomadUserObject = JSON.parse(localNomadUser)

	if (nomadUserObject.admin) {
		return <AdminReviews />
	}
	else {
		return <CustomerReviews />
	}
}
