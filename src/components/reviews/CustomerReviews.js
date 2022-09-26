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
            .then(getAllReviews);
            
    }

    return <>
        <Container>
            <Card className="p-3 my-4 shadow bg-light">
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
                                placeholder="Leave a comment here"
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
                                placeholder="Leave a comment here"
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
                    <hr/>
                    </div>
                </Collapse>


                {
                    reviews.map(review =>

                        <Card className="m-auto my-3 p-3" style={{ width: '55rem' }}>
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
                                ? <Button style={{ width: '15rem' }} className="align-self-end"variant="outline-danger" size="md" 
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
            </Card>
        </Container>
    </>
}