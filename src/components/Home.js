import { useState } from "react";
import { Button, Card, Carousel, Col, Container, Row, Stack } from "react-bootstrap"
import "./Home.css"


export const Home = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    return <>
        <Container>
            <Row className="my-3">
                <Col>
                    <img
                        className="d-block w-100"
                        src="https://static.onecms.io/wp-content/uploads/sites/43/2020/01/GettyImages-868935172-2000.jpg"
                        alt="Third slide"
                    />
                </Col>
                <Col>1 of 1</Col>
            </Row>
            <Stack direction="horizontal" gap={2} className="justify-content-center mb-3">
                <Button as="a" variant="outline-danger" size="lg">
                    Book Now!
                </Button>
            </Stack>
            <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-inner">
                <Carousel.Item >
                    <Row>
                        <Col>
                            <Card>
                                <img
                                    className="d-block w-100"
                                    src="https://www.idratherbeachef.com/wp-content/uploads/2016/02/pan-seared-pork-chops-678x1024.jpg"
                                    alt="Third slide"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <img
                                    className="d-block w-100"
                                    src="https://www.eatwell101.com/wp-content/uploads/2021/08/sauteed-garlic-butter-mushrooms-recipe.jpg"
                                    alt="Third slide"
                                />
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <img
                                    className="d-block w-100"
                                    src="https://static.onecms.io/wp-content/uploads/sites/43/2020/01/GettyImages-868935172-2000.jpg"
                                    alt="Third slide"
                                />
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
        </Container>
    </>
}