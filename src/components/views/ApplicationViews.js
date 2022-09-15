import { CustomerViews } from "./CustomerViews"
import { AdminViews } from "./AdminViews"


export const ApplicationViews = () => {


	const localNomadUser = localStorage.getItem("nomad_user")
    const nomadUserObject = JSON.parse(localNomadUser)

	if (nomadUserObject.admin) {
		return <AdminViews />
	}
	else {
		return <CustomerViews />
	}
}