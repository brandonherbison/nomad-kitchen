import { useEffect, useState } from "react"
import { Button, Card, Container, Row } from "react-bootstrap"






export const Inbox = () => {

    const [messages, setMessages] = useState([])

    const getAllMessages = () => {

        fetch(`http://localhost:8088/messages`)
        .then(response => response.json())
        .then((messageArray) => {
            setMessages(messageArray)
        })
    }


    useEffect(
        () => {
            getAllMessages()
        }, []
    )

    const localNomadUser = localStorage.getItem("nomad_user")
    const nomadUserObject = JSON.parse(localNomadUser)

    return<>
     <Container>
     <Row className="text-center my-3">
            <h1>Messages</h1>
        </Row>
        {
            messages.map(message => 
            
            message.userId === nomadUserObject.id && message.isArchived === false
            ? <><Card className="p-3 m-auto shadow bg-light" style={{ width: '55rem' }}>
                <Card.Title className="mx-3">From: Brandon Herbison (Admin)</Card.Title>
                <Card.Body>{message.body}</Card.Body>
                <Button 
                onClick={() => {

                    const copy = {
                        userId: message.userId,
                        body: message.body,
                        isArchived: true
                    }
                    fetch(`http://localhost:8088/messages/${message.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(copy)
                    })
                        .then(response => response.json())
                        .then(getAllMessages)

                }}className="align-self-end" variant="outline-danger">
                    Archive
                </Button>
                </Card></>
                : ""
                )
        }

     </Container>
    </>
}