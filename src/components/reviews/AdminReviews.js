import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"



export const AdminReviews = () => {

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

    return <>
        <Container>
            <Card className="p-3 my-4 shadow bg-light">
                <Row className="text-center">
                    <h1>Reviews</h1>
                </Row>
                <Row className="d-flex flex-column-reverse">

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
                                <Button style={{ width: '15rem' }} className="align-self-end" variant="outline-danger" size="md"
                                    onClick={() => {
                                        fetch(`http://localhost:8088/reviews/${review.id}`, {
                                            method: "DELETE"
                                        })
                                            .then(getAllReviews)
                                    }}>Delete</Button>
                            </Card>
                        )
                    }
                </Row>
            </Card>
        </Container>
    </>
}