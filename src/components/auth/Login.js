import React, { useState } from "react"
import { Button, Card, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { TbTent } from "react-icons/tb";
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const [email, set] = useState("email")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then(res => res.json())
      .then(foundUsers => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0]
          localStorage.setItem("nomad_user", JSON.stringify({
            id: user.id,
            admin: user.isAdmin,
            fullName: user.fullName
          }))
          user.isAdmin
          ? navigate("/bookings")
          : navigate("/home")
          
        }
        else {
          window.alert("Invalid ")
        }
      })
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
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={evt => set(evt.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="outline-danger" type="submit" className="mx-2">
                Log In
              </Button>
              <Button variant="outline-danger" href="/register">
                Not a member yet?
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




