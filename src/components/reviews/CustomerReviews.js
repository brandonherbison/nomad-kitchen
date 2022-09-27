import { useEffect, useState } from "react"
import { Button, Card, Col, Collapse, Container, FloatingLabel, Form, Row } from "react-bootstrap"




export const CustomerReviews = () => {


    const [open, setOpen] = useState(false)

    const [review, update] = useState({

        title: "",
        body: ""
    })
    const [reviews, setReviews] = useState([])


    const getAllReviews = () => {

        fetch(`http://localhost:8088/reviews?_expand=user`)
            .then(response => response.json())
            .then((data) => {
                setReviews(data)
            })
    }

    useEffect(
        () => {
            getAllReviews()
        }, []
    )



    const localNomadUser = localStorage.getItem("nomad_user")
    const nomadUserObject = JSON.parse(localNomadUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


        // TODO: Create the object to be saved to the API

        const reviewToSendToAPI = {
            userId: nomadUserObject.id,
            title: review.title,
            body: review.body

        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewToSendToAPI)
        })
            .then(response => response.json())
            .then(update({
                title: "",
                body: ""
            }))
            .then(getAllReviews)
            .then(setOpen(false));

    }

    return <>
        <Container>
            <Card className="p-3 my-4 shadow bg-light">
            <Row className="text-center">
            <h1>Reviews</h1>
        </Row>
                <Button
                    style={{ width: '25rem' }}
                    className="m-auto my-3"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    variant="outline-danger"
                >
                    Leave us a review!
                </Button>
                <Collapse style={{ width: '55rem' }} className="m-auto" in={open}>
                    <div id="example-collapse-text">
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Title"
                            className="mb-3"
                        >
                            <Form.Control style={{ width: '55rem' }}
                                className="m-auto"
                                as="textarea"
                                value={review.title}
                                onChange={
                                    (evt) => {
                                        const copy = { ...review }
                                        copy.title = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea2" label="Comments">
                            <Form.Control

                                as="textarea"
                                value={review.body}
                                style={{ height: '100px', width: '55rem' }}
                                onChange={
                                    (evt) => {
                                        const copy = { ...review }
                                        copy.body = evt.target.value
                                        update(copy)
                                    }
                                }
                            />
                        </FloatingLabel>
                        <Row style={{ width: '55rem' }}>
                            <Col className="my-2" >
                                <Button variant="outline-danger" type="submit" size="md" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} >Submit</Button>
                            </Col>

                        </Row>
                        <hr />
                    </div>
                </Collapse>

                <Row className="d-flex flex-column-reverse">
                    {
                        reviews.map(review =>

                            <Card className="m-auto my-3 p-3 shadow" style={{ width: '55rem' }}>
                                <Card.Title className=" mx-3 ">
                                    {review.title}
                                </Card.Title>
                                <Card.Body>
                                    {review.body}
                                </Card.Body>
                                <Card.Body>
                                    By: {review.user.fullName}
                                </Card.Body>
                                {
                                    review.userId === nomadUserObject.id
                                        ? <Button style={{ width: '15rem' }} className="align-self-end" variant="outline-danger" size="md"
                                            onClick={() => {
                                                fetch(`http://localhost:8088/reviews/${review.id}`, {
                                                    method: "DELETE"
                                                })
                                                    .then(getAllReviews)
                                            }}>Delete</Button>
                                        : ""
                                }
                            </Card>
                        )
                    }
                </Row>
            </Card>
        </Container>
    </>
}