import { useState } from "react"
import { Button, Card, Col, Container, Form, Row, Stack } from "react-bootstrap"
import { TbTent } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isAdmin: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("nomad_user", JSON.stringify({
                        id: createdUser.id,
                        admin: createdUser.isAdmin
                    }))

                    navigate("/home")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return <>
<Container>

<Stack className="text-center mb-3 mt-5">
  < TbTent size={50} color="red" className="mb-1 align-self-center" />
  <h1>Nomad Kitchen</h1>
  <h5>In-Home Cuisines and Cocktails</h5>
</Stack>
<Row>
  <Col className="col-3">

  </Col>
  <Col className="col-6 align-self-center">

    <Card className="p-3 bg-light">
    <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="fullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="fullName" placeholder="Full Name" onChange={updateCustomer} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={updateCustomer}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="outline-danger" type="submit">
        Register
      </Button>
    </Form>
    </Card>
  </Col>
  <Col className="col-3">

  </Col>
</Row>
</Container>
    </>
}
