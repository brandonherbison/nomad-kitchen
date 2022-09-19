


import { useEffect, useState } from "react"
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"




export const BookingEdit = () => {

    const [booking, update] = useState({
        guestTotal: 0,
        occasion: "",
        location: "",
        date: "",
        time: ""

    })

    const [starterChoiceObject, setStarterChoiceObject] = useState({
    })

    const [starterChoices, setStarterChoices] = useState([])
    const [mainChoices, setMainChoices] = useState({})
    const [sideChoices, setSideChoices] = useState({})
    const [dessertChoices, setDessertChoices] = useState({})




    const [starters, setStarters] = useState([])
    const [mains, setMains] = useState([])
    const [sides, setSides] = useState([])
    const [desserts, setDesserts] = useState([])

    const navigate = useNavigate()

    const {bookingId} = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/bookings/${bookingId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    }, [bookingId])

    useEffect(() => {
        fetch(`http://localhost:8088/starterChoices?_expand=booking&bookingId=${bookingId}&_expand=starter`)
            .then(response => response.json())
            .then((data) => {
  
                setStarterChoices(data)
            })
    }, [bookingId])

    useEffect(() => {
        /* 
        {1:3}
        */


        const choiceTracker = {}

        for (const starterChoice of starterChoices) {
            choiceTracker[starterChoice.starterId] = starterChoice.quantity
        }
        setStarterChoiceObject(choiceTracker)
       
    //    const starterChoiceArray = starterChoices.map(starterChoice => {
    //     return [starterChoice.starterId]: starterChoice.quantity
    //    })
    //    setStarterChoiceArray(starterChoiceArray)
    }, [starterChoices]

    )




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


        return fetch(`http://localhost:8088/bookings/${booking.id}`, {
            method: "PUT",
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
                            method: "PUT",
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
                            method: "PUT",
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
                            method: "PUT",
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
                            method: "PUT",
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
                <Card.Body><h2>Edit Booking</h2></Card.Body>
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
>
                            <InputGroup.Text id="basic-addon1">{starter.name}</InputGroup.Text>
                            <Form.Control
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="basic-addon1"
                                value={starterChoiceObject[starter.id]}
                                defaultValue={starterChoiceObject[starter.id]}
                                onChange={
                                    (evt) => {
                                        const copy = { ...starterChoiceObject }
                                        copy[starter.id] = parseInt(evt.target.value)
                                        if (evt.target.value !== "") {
                                            setStarterChoiceObject(copy)
    
                                        }
                                        else {
                                            delete copy[starter.id];
                                            setStarterChoiceObject(copy)
                                        }
    
    
                                    }
                                }
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