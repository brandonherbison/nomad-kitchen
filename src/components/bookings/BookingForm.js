import { useEffect, useState } from "react"
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"




export const BookingForm = () => {

    const [booking, update] = useState({
        guestTotal: 0,
        occasion: "",
        location: "",
        date: "",
        time: ""

    })



    const [starterChoices, setStarterChoices] = useState({})
    const [mainChoices, setMainChoices] = useState({})
    const [sideChoices, setSideChoices] = useState({})
    const [dessertChoices, setDessertChoices] = useState({})




    const [starters, setStarters] = useState([])
    const [mains, setMains] = useState([])
    const [sides, setSides] = useState([])
    const [desserts, setDesserts] = useState([])

    const navigate = useNavigate()




    useEffect(
        () => {
            fetch(`http://localhost:8088/starters`)
                .then(response => response.json())
                .then((starterArray) => {
                    setStarters(starterArray)
                })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/mains`)
                .then(response => response.json())
                .then((mainArray) => {
                    setMains(mainArray)
                })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/sides`)
                .then(response => response.json())
                .then((sideArray) => {
                    setSides(sideArray)
                })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/desserts`)
                .then(response => response.json())
                .then((dessertArray) => {
                    setDesserts(dessertArray)
                })
        }, []
    )

    const localNomadUser = localStorage.getItem("nomad_user")
    const nomadUserObject = JSON.parse(localNomadUser)






    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        const bookingToSendToAPI = {
            userId: nomadUserObject.id,
            guestTotal: booking.guestTotal,
            occasion: booking.occasion,
            location: booking.location,
            date: booking.date,
            time: booking.time,
            price: booking.guestTotal * 125,
            isApproved: ""
        }

        const starterChoiceToSendToAPI = {}
        const mainChoiceToSendToAPI = {}
        const sideChoiceToSendToAPI = {}
        const dessertChoiceToSendToAPI = {}


        return fetch(`http://localhost:8088/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingToSendToAPI)
        })
            .then(response => response.json())

            .then((booking) => {
                starterChoiceToSendToAPI.bookingId = booking.id
                mainChoiceToSendToAPI.bookingId = booking.id
                sideChoiceToSendToAPI.bookingId = booking.id
                dessertChoiceToSendToAPI.bookingId = booking.id
                const promiseArray = []

                for (const starterId of Object.keys(starterChoices)) {
                    const quantity = starterChoices[starterId]

                    starterChoiceToSendToAPI.starterId = parseInt(starterId)
                    starterChoiceToSendToAPI.quantity = quantity
                    promiseArray.push(

                        fetch(`http://localhost:8088/starterChoices`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(starterChoiceToSendToAPI)
                        })


                    )


                }
                for (const mainId of Object.keys(mainChoices)) {
                    const quantity = mainChoices[mainId]

                    mainChoiceToSendToAPI.mainId = parseInt(mainId)
                    mainChoiceToSendToAPI.quantity = quantity
                    promiseArray.push(

                        fetch(`http://localhost:8088/mainChoices`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(mainChoiceToSendToAPI)
                        })


                    )


                }
                for (const sideId of Object.keys(sideChoices)) {
                    const quantity = sideChoices[sideId]

                    sideChoiceToSendToAPI.sideId = parseInt(sideId)
                    sideChoiceToSendToAPI.quantity = quantity
                    promiseArray.push(

                        fetch(`http://localhost:8088/sideChoices`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(sideChoiceToSendToAPI)
                        })


                    )


                }
                for (const dessertId of Object.keys(dessertChoices)) {
                    const quantity = dessertChoices[dessertId]

                    dessertChoiceToSendToAPI.dessertId = parseInt(dessertId)
                    dessertChoiceToSendToAPI.quantity = quantity
                    promiseArray.push(

                        fetch(`http://localhost:8088/dessertChoices`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(dessertChoiceToSendToAPI)
                        })


                    )


                }
                Promise.all([promiseArray]
                ).then(function (responses) {
                    // Get a JSON object from each of the responses
                    return Promise.all(responses.map(function (response) {
                        return response.json();
                    }));
                }).then(function (data) {
                    // Log the data to the console
                    // You would do something with both sets of data here
                    console.log(data);
                }).catch(function (error) {
                    // if there's an error, log it
                    console.log(error);
                })
                .then(() => {
                    navigate("/bookings")
            })
                


            })
    }


    return <>
        <Container>
            <Card className="align-items-center m-5" >
                <Card.Body><h2>Booking Form</h2></Card.Body>
                <Card.Body>Party Details</Card.Body>

                <InputGroup className="my-2">
                    <InputGroup.Text id="basic-addon1">How many will be in attendance?</InputGroup.Text>
                    <Form.Control
                        value={booking.guestTotal}
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.guestTotal = evt.target.value
                                update(copy)
                            }
                        }
                        placeholder="0"
                        aria-label="Total Guests"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="my-2">
                    <InputGroup.Text id="basic-addon1">Whats the occasion?</InputGroup.Text>
                    <Form.Control
                        value={booking.occasion}
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.occasion = evt.target.value
                                update(copy)
                            }
                        }
                        placeholder="Example: Dinner Party"
                        aria-label="Example: Dinner Party"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="my-2">
                    <InputGroup.Text id="basic-addon1">Address:</InputGroup.Text>
                    <Form.Control
                        value={booking.location}
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.location = evt.target.value
                                update(copy)
                            }
                        }
                        placeholder="Street Address"
                        aria-label="Street Address"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="my-2">
                    <InputGroup.Text id="basic-addon1">Request Date:</InputGroup.Text>
                    <Form.Control
                        value={booking.date}
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.date = evt.target.value
                                update(copy)
                            }
                        }
                        type="date"
                        aria-label="mm/dd/yyyy"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="my-2">
                    <InputGroup.Text id="basic-addon1">Request Time:</InputGroup.Text>
                    <Form.Select aria-label="Default select example"
                        value={booking.time}
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.time = evt.target.value
                                update(copy)
                            }
                        }>
                        <option>Select Time</option>
                        <option>5:00pm</option>
                        <option>6:00pm</option>
                        <option>7:00pm</option>
                        <option>8:00pm</option>
                    </Form.Select>
                </InputGroup>
                <Card.Body>Choose Starters</Card.Body>
                {
                    starters.map(starter =>
                        <InputGroup className="my-2" key={`starter--${starter.id}`}
                            value={starterChoices[starter.id]}
                            onChange={
                                (evt) => {
                                    const copy = { ...starterChoices }
                                    copy[starter.id] = parseInt(evt.target.value)
                                    if (evt.target.value !== "") {
                                        setStarterChoices(copy)

                                    }
                                    else {
                                        delete copy[starter.id];
                                        setStarterChoices(copy)
                                    }


                                }
                            }>
                            <InputGroup.Text id="basic-addon1">{starter.name}</InputGroup.Text>
                            <Form.Control
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="basic-addon1"

                            />
                        </InputGroup>)
                }
                <Card.Body>Choose Mains</Card.Body>
                {
                    mains.map(main =>
                        <InputGroup className="my-2" key={`main--${main.id}`}
                            value={mainChoices[main.id]}
                            onChange={
                                (evt) => {
                                    const copy = { ...mainChoices }
                                    copy[main.id] = parseInt(evt.target.value)
                                    if (evt.target.value !== "") {
                                        setMainChoices(copy)

                                    }
                                    else {
                                        delete copy[main.id];
                                        setMainChoices(copy)
                                    }


                                }
                            }>
                            <InputGroup.Text id="basic-addon1">{main.name}</InputGroup.Text>
                            <Form.Control
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>)
                }
                <Card.Body>Choose Sides</Card.Body>
                {
                    sides.map(side =>
                        <InputGroup className="my-2" key={`side--${side.id}`}
                            value={sideChoices[side.id]}
                            onChange={
                                (evt) => {
                                    const copy = { ...sideChoices }
                                    copy[side.id] = parseInt(evt.target.value)
                                    if (evt.target.value !== "") {
                                        setSideChoices(copy)

                                    }
                                    else {
                                        delete copy[side.id];
                                        setSideChoices(copy)
                                    }


                                }
                            }>
                            <InputGroup.Text id="basic-addon1">{side.name}</InputGroup.Text>
                            <Form.Control
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>)
                }
                <Card.Body>Choose Desserts</Card.Body>
                {
                    desserts.map(dessert =>
                        <InputGroup className="my-2" key={`dessert--${dessert.id}`}
                            value={dessertChoices[dessert.id]}
                            onChange={
                                (evt) => {
                                    const copy = { ...dessertChoices }
                                    copy[dessert.id] = parseInt(evt.target.value)
                                    if (evt.target.value !== "") {
                                        setDessertChoices(copy)

                                    }
                                    else {
                                        delete copy[dessert.id];
                                        setDessertChoices(copy)
                                    }


                                }
                            }>
                            <InputGroup.Text id="basic-addon1">{dessert.name}</InputGroup.Text>
                            <Form.Control
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>)
                }
                <Button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</Button>
            </Card>
        </Container>
    </>
}



//--------------Dynamic Variables--------------
//
// Today (9/14) was all about state management. I tried first to create a state variable to store an object in, starterChoice.
// There were two key value pairs inside of this object; starterId and quantity. I then created a second state variable to store an array in, starterChoices.
// Through the use of useEffect() function I was able to observe the starterChoice state variable and push each starterChoice object into the starterChoices array only if the quantity was greater than zero. 
// What I thought was a massive breakthrough only proved to be a step further in the wrong direction as I quickly realized I was unable to remove items from this array.
// Coach walked me through the use of a new type of variable, the DYNAMIC VARIABLE. This was something I had not seen before. After doing some research I found out that it is fairly less common but incredibly powerful.
// This variable does not have a specific name hard coded into the script, instead they are named dynamically with string values from other sources.
// This method works best because the state variable is an empty object until a change to the input field is registered and then a key value pair is created within the object. 
// The key being the id of of the dessert object and the value being what was captured in the form field. 
// Through the use of a conditional statement we were able to create new key value pairs if there is something in the input field, and delete them if there is nothing in the input field.
//
//
// Now new problems have presented themselves in spectacular fashion. I am having issues trying to figure out a way to post this information to the database.
// I know that I will be iterating through the keys of each object. Additionally, I will need to find a way to post each key value pair as a new to the database as a new object.
// I have researched promise.all and think this may also play a role in solving this problem. Looking forward to learning more about that tomorrow.
//
//
//
