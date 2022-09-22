


import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"




export const BookingEdit = () => {

    const [booking, update] = useState({
        guestTotal: 0,
        occasion: "",
        location: "",
        date: "",
        time: ""

    })

    /* 
        Target data structure for this state variable

        {
            startedId: {
                choiceId: primaryKeyOfChoice,
                quantity: quantity
            }
        }
    */
    const [starterChoiceObject, setStarterChoiceObject] = useState({})
    const [mainChoiceObject, setMainChoiceObject] = useState({})
    const [sideChoiceObject, setSideChoiceObject] = useState({})
    const [dessertChoiceObject, setDessertChoiceObject] = useState({})

    const [starterChoices, setStarterChoices] = useState([])
    const [mainChoices, setMainChoices] = useState([])
    const [sideChoices, setSideChoices] = useState([])
    const [dessertChoices, setDessertChoices] = useState([])




    const [starters, setStarters] = useState([])
    const [mains, setMains] = useState([])
    const [sides, setSides] = useState([])
    const [desserts, setDesserts] = useState([])

    const navigate = useNavigate()

    const { bookingId } = useParams()

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
        fetch(`http://localhost:8088/mainChoices?_expand=booking&bookingId=${bookingId}&_expand=main`)
            .then(response => response.json())
            .then((data) => {

                setMainChoices(data)
            })
    }, [bookingId])
    useEffect(() => {
        fetch(`http://localhost:8088/sideChoices?_expand=booking&bookingId=${bookingId}&_expand=side`)
            .then(response => response.json())
            .then((data) => {

                setSideChoices(data)
            })
    }, [bookingId])
    useEffect(() => {
        fetch(`http://localhost:8088/dessertChoices?_expand=booking&bookingId=${bookingId}&_expand=dessert`)
            .then(response => response.json())
            .then((data) => {

                setDessertChoices(data)
            })
    }, [bookingId])

    useEffect(() => {
        const choiceTracker = {}

        for (const starterChoice of starterChoices) {
            choiceTracker[starterChoice.starterId] = {
                choiceId: starterChoice.id,
                quantity: starterChoice.quantity
            }
        }
        setStarterChoiceObject(choiceTracker)

    }, [starterChoices])

    useEffect(() => {
        const choiceTracker = {}

        for (const mainChoice of mainChoices) {
            choiceTracker[mainChoice.mainId] = {
                choiceId: mainChoice.id,
                quantity: mainChoice.quantity
            }
        }
        setMainChoiceObject(choiceTracker)

    }, [mainChoices])

    useEffect(() => {
        const choiceTracker = {}

        for (const sideChoice of sideChoices) {
            choiceTracker[sideChoice.sideId] = {
                choiceId: sideChoice.id,
                quantity: sideChoice.quantity
            }
        }
        setSideChoiceObject(choiceTracker)

    }, [sideChoices])

    useEffect(() => {
        const choiceTracker = {}

        for (const dessertChoice of dessertChoices) {
            choiceTracker[dessertChoice.dessertId] = {
                choiceId: dessertChoice.id,
                quantity: dessertChoice.quantity
            }
        }
        setDessertChoiceObject(choiceTracker)

    }, [dessertChoices])




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


        return fetch(`http://localhost:8088/bookings/${bookingId}`, {
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

                for (const starterId of Object.keys(starterChoiceObject)) {
                    const trackerObject = starterChoiceObject[starterId]

                    starterChoiceToSendToAPI.starterId = parseInt(starterId)
                    starterChoiceToSendToAPI.quantity = trackerObject.quantity

                    promiseArray.push(
                        fetch(`http://localhost:8088/starterChoices/${trackerObject.choiceId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(starterChoiceToSendToAPI)
                        })
                    )


                }
                for (const mainId of Object.keys(mainChoiceObject)) {
                    const trackerObject = mainChoiceObject[mainId]

                    mainChoiceToSendToAPI.mainId = parseInt(mainId)
                    mainChoiceToSendToAPI.quantity = trackerObject.quantity
                    promiseArray.push(

                        fetch(`http://localhost:8088/mainChoices/${trackerObject.choiceId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(mainChoiceToSendToAPI)
                        })


                    )


                }
                for (const sideId of Object.keys(sideChoiceObject)) {
                    const trackerObject = sideChoiceObject[sideId]

                    sideChoiceToSendToAPI.sideId = parseInt(sideId)
                    sideChoiceToSendToAPI.quantity = trackerObject.quantity
                    promiseArray.push(

                        fetch(`http://localhost:8088/sideChoices/${trackerObject.choiceId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(sideChoiceToSendToAPI)
                        })


                    )


                }
                for (const dessertId of Object.keys(dessertChoiceObject)) {
                    const trackerObject = dessertChoiceObject[dessertId]

                    dessertChoiceToSendToAPI.dessertId = parseInt(dessertId)
                    dessertChoiceToSendToAPI.quantity = trackerObject.quantity
                    promiseArray.push(

                        fetch(`http://localhost:8088/dessertChoices/${trackerObject.choiceId}`, {
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

                    console.log(data);
                }).catch(function (error) {

                    console.log(error);
                })
                    .then(() => {
                        navigate("/bookings")
                    })



            })
    }


    return <>
        <Container>
            <Card className="m-5 px-5 shadow bg-light" >
                <Card.Body className="text-center"><h2>Edit Booking</h2></Card.Body>
                <Card.Body className="text-center">Party Details</Card.Body>

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
                <Card.Body className="text-center">Choose Starters</Card.Body>
                {
                    starters.map(starter =>
                        <InputGroup className="my-2" key={`starter--${starter.id}`}>
                            <InputGroup.Text id="basic-addon1">{starter.name}</InputGroup.Text>
                            <Form.Control
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="basic-addon1"
                                value={starterChoiceObject[starter.id]?.quantity}
                                // defaultValue={starterChoiceObject[starter.id]}
                                onChange={
                                    (evt) => {
                                        const copy = { ...starterChoiceObject }
                                        copy[starter.id] = {
                                            choiceId: copy[starter.id].choiceId,
                                            quantity: parseInt(evt.target.value)
                                        }
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
                <Card.Body className="text-center">Choose Mains</Card.Body>
                {
                    mains.map(main =>
                        <InputGroup className="my-2" key={`main--${main.id}`}>
                            <InputGroup.Text id="basic-addon1">{main.name}</InputGroup.Text>
                            <Form.Control
                                aria-describedby="basic-addon1"
                                placeholder="0"
                                aria-label="0"
                                value={mainChoiceObject[main.id]?.quantity}
                                // defaultValue={mainChoiceObject[main.id]}
                                onChange={
                                    (evt) => {
                                        const copy = { ...mainChoiceObject }
                                        copy[main.id] = {
                                            choiceId: copy[main.id].choiceId,
                                            quantity: parseInt(evt.target.value)
                                        }
                                        if (evt.target.value !== "") {
                                            setMainChoiceObject(copy)

                                        }
                                        else {
                                            delete copy[main.id];
                                            setMainChoiceObject(copy)
                                        }


                                    }
                                }


                            />
                        </InputGroup>)
                }
                <Card.Body className="text-center">Choose Sides</Card.Body>
                {
                    sides.map(side =>
                        <InputGroup className="my-2" key={`side--${side.id}`}>
                            <InputGroup.Text id="basic-addon1">{side.name}</InputGroup.Text>
                            <Form.Control
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="basic-addon1"
                                value={sideChoiceObject[side.id]?.quantity}
                                // defaultValue={sideChoiceObject[side.id]}
                                onChange={
                                    (evt) => {
                                        const copy = { ...sideChoiceObject }
                                        copy[side.id] = {
                                            choiceId: copy[side.id].choiceId,
                                            quantity: parseInt(evt.target.value)
                                        }
                                        if (evt.target.value !== "") {
                                            setSideChoiceObject(copy)

                                        }
                                        else {
                                            delete copy[side.id];
                                            setSideChoiceObject(copy)
                                        }


                                    }
                                }

                            />
                        </InputGroup>)
                }
                <Card.Body className="text-center">Choose Desserts</Card.Body>
                {
                    desserts.map(dessert =>
                        <InputGroup className="my-2" key={`dessert--${dessert.id}`}>
                            <InputGroup.Text id="basic-addon1">{dessert.name}</InputGroup.Text>
                            <Form.Control
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="basic-addon1"
                                value={dessertChoiceObject[dessert.id]?.quantity}
                                // defaultValue={dessertChoiceObject[dessert.id]}
                                onChange={
                                    (evt) => {
                                        const copy = { ...dessertChoiceObject }
                                        copy[dessert.id] = {
                                            choiceId: copy[dessert.id].choiceId,
                                            quantity: parseInt(evt.target.value)
                                        }
                                        if (evt.target.value !== "") {
                                            setDessertChoiceObject(copy)

                                        }
                                        else {
                                            delete copy[dessert.id];
                                            setDessertChoiceObject(copy)
                                        }


                                    }
                                }


                            />
                        </InputGroup>)
                }
                <Row>
                    <Col className="my-3">
                    <Button variant="outline-danger float-end" size="lg" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>Submit</Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    </>
}