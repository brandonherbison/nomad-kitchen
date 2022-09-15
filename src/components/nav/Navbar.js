
import { AdminNav } from "./AdminNav"
import { CustomerNav } from "./CustomerNav"


export const NavBar = () => {
	const localNomadUser = localStorage.getItem("nomad_user")
    const nomadUserObject = JSON.parse(localNomadUser)

	if (nomadUserObject.admin) {
		return <AdminNav />
	}
	else {
		return <CustomerNav />
	}
}
