import { useEffect, useState } from "react"
import { Card, Container, Row } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"




export const Menu = () => {

    const [starters, setStarters] = useState([])
    const [mains, setMains] = useState([])
    const [sides, setSides] = useState([])
    const [desserts, setDesserts] = useState([])


    useEffect(
        () => {
             fetch(`http://localhost:8088/starters`)
            .then(response => response.json())
            .then((starterArray) => {
                setStarters(starterArray)
            })
        },[]
    )

    useEffect(
        () => {
             fetch(`http://localhost:8088/mains`)
            .then(response => response.json())
            .then((mainArray) => {
                setMains(mainArray)
            })
        },[]
    )

    useEffect(
        () => {
             fetch(`http://localhost:8088/sides`)
            .then(response => response.json())
            .then((sideArray) => {
                setSides(sideArray)
            })
        },[]
    )

    useEffect(
        () => {
             fetch(`http://localhost:8088/desserts`)
            .then(response => response.json())
            .then((dessertArray) => {
                setDesserts(dessertArray)
            })
        },[]
    )







    return <>
    <Container>
        <Row>
            <Card>
                <Card.Body>Starters</Card.Body>
            </Card>
            {
                starters.map(starter => 
                    <Card style={{ width: '18rem' }} key={`starter--${starter.id}`}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                      <Card.Title>{starter.name}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>)
            }
        </Row>
            <Card>
                <Card.Body>Mains</Card.Body>
            </Card>
        <Row>
            {
                mains.map(main => 
                    <Card style={{ width: '18rem' }} key={`main--${main.id}`}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                      <Card.Title>{main.name}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>)
            }
        </Row>
            <Card>
                <Card.Body>Sides</Card.Body>
            </Card>
        <Row>
            {
                sides.map(side => 
                    <Card style={{ width: '18rem' }} key={`side--${side.id}`}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                      <Card.Title>{side.name}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>)
            }
        </Row>
            <Card>
                <Card.Body>Desserts</Card.Body>
            </Card>
        <Row>
            {
                desserts.map(dessert => 
                    <Card  style={{ width: '18rem' }} key={`dessert--${dessert.id}`}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                    <Card.Body>
                      <Card.Title>{dessert.name}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>)
            }
        </Row>
</Container>
    </>
}