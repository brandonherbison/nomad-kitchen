import { useEffect, useState } from "react"
import { Button, Card, Col, Collapse, FloatingLabel, Form, Row } from "react-bootstrap"
import { FiSend } from 'react-icons/fi'




export const Booking = ({ bookingId, fullName, guestTotal, date, isApproved, occasion, price, location, time, getAllBookings, userId, drinkPackage }) => {

    const [open, setOpen] = useState(false)
    const [openDeny, setOpenDeny] = useState(false)


    const [starterChoices, updateStarterChoices] = useState()
    const [mainChoices, updateMainChoices] = useState()
    const [sideChoices, updateSideChoices] = useState()
    const [dessertChoices, updateDessertChoices] = useState()

    const [message, updateMessage] = useState({
        body: ""
    })




    useEffect(
        () => {
            fetch(`http://localhost:8088/starterChoices?_expand=booking&_expand=starter&bookingId=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    updateStarterChoices(data)
                })
        }, [bookingId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/mainChoices?_expand=booking&_expand=main&bookingId=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    updateMainChoices(data)
                })
        }, [bookingId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/sideChoices?_expand=booking&_expand=side&bookingId=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    updateSideChoices(data)
                })
        }, [bookingId]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/dessertChoices?_expand=booking&_expand=dessert&bookingId=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    updateDessertChoices(data)
                })
        }, [bookingId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        // TODO: Create the object to be saved to the API

        const messageToSendToAPI = {
            userId: userId,
            body: message.body,
            isArchived: false


        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageToSendToAPI)
        })
            .then(response => response.json())
            .then(updateMessage({
                body: ""
            }))
            .then(setOpenDeny(false))

    }

    return <>

        <Card className="m-auto my-3 py-2 shadow" style={{ width: '65rem' }} >
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title className="m-2"> <h4>Reservation for {fullName}</h4> </Card.Title>
                    </Col>
                    <Col>
                        <Button
                            variant="outline-dark"
                            className="float-end"
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            Expand
                        </Button> {
                            isApproved
                                ? ""
                                : <><Button className="float-end mx-2" onClick={() => {

                                    const copy = {
                                        userId: userId,
                                        guestTotal: guestTotal,
                                        location: location,
                                        occasion: occasion,
                                        date: date,
                                        time: time,
                                        price: price,
                                        drinkPackage: drinkPackage,
                                        isApproved: true
                                    }
                                    fetch(`http://localhost:8088/bookings/${bookingId}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(copy)
                                    })
                                        .then(response => response.json())
                                        .then(getAllBookings)

                                }} variant="outline-success">Approve</Button>
                                    <Button variant="outline-danger" className="float-end"
                                        onClick={() => setOpenDeny(!openDeny)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openDeny}>
                                        Deny
                                    </Button>
                                    <Collapse in={openDeny} className="mt-5">
                                        <div>
                                            <Card className="p-3 my-2 bg-light">

                                                <FloatingLabel controlId="floatingTextarea2" label="Reason for denial">
                                                    <Form.Control
                                                        style={{ height: '7rem' }}
                                                        as="textarea"
                                                        value={message.body}
                                                        onChange={
                                                            (evt) => {
                                                                const copy = { ...message }
                                                                copy.body = evt.target.value
                                                                updateMessage(copy)
                                                            }
                                                        }


                                                    />
                                                </FloatingLabel>
                                                <Button variant="light" className="align-self-end mt-2" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                                                    < FiSend size={20} color="dark" /> Send
                                                </Button>

                                            </Card>
                                        </div>
                                    </Collapse>
                                </>
                        }
                    </Col>
                </Row>


                <Collapse in={open} className="m-2">
                    <Row id="example-collapse-text">
                        <hr />
                        <Col className="1">
                            <Card.Title>
                                Details.
                            </Card.Title>
                            <Card.Text>
                                {guestTotal} guests
                            </Card.Text>
                            <Card.Text>
                                For: {occasion}
                            </Card.Text>
                            <Card.Text>
                                Address: {location}
                            </Card.Text>
                            <Card.Text>
                                Date: {date}
                            </Card.Text>
                            <Card.Text>
                                Time: {time}
                            </Card.Text>
                            <Card.Text>
                                Drink Package? {
                                    drinkPackage
                                        ? "Yes"
                                        : "No"
                                }
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Title>
                                Starters.
                            </Card.Title>
                            {
                                starterChoices?.map(starterChoice =>
                                    <Card.Text key={`starterChoice--${starterChoice.id}`}>
                                        {starterChoice?.quantity} {starterChoice?.starter?.name}
                                    </Card.Text>
                                )
                            }
                        </Col>
                        <Col>
                            <Card.Title>
                                Mains.
                            </Card.Title>
                            {
                                mainChoices?.map(mainChoice =>
                                    <Card.Text key={`mainChoice--${mainChoice.id}`}>
                                        {mainChoice?.quantity} {mainChoice?.main?.name}
                                    </Card.Text>
                                )
                            }
                        </Col>
                        <Col>
                            <Card.Title>
                                Sides.
                            </Card.Title>
                            {
                                sideChoices?.map(sideChoice =>
                                    <Card.Text key={`sideChoice--${sideChoice.id}`}>
                                        {sideChoice?.quantity} {sideChoice?.side?.name}
                                    </Card.Text>
                                )
                            }
                        </Col>
                        <Col>
                            <Card.Title>
                                Desserts.
                            </Card.Title>
                            {
                                dessertChoices?.map(dessertChoice =>
                                    <Card.Text key={`dessertChoice--${dessertChoice.id}`}>
                                        {dessertChoice?.quantity} {dessertChoice?.dessert?.name}
                                    </Card.Text>
                                )
                            }
                        </Col>
                    </Row>
                </Collapse>



            </Card.Body>
        </Card>

    </>
}