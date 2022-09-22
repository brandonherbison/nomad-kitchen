import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
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







    return <>
        <Container className="mt-5 " >
            <Card className="bg-light shadow mb-5">

                <Card.Body className="text-center bg-dark text-light" size="lg">
                    <h3>Starters</h3>
                </Card.Body>
                <Row className="justify-content-center">
                    {
                        starters.map(starter =>
                            <Card style={{ width: '55rem', height: '11rem' }} key={`starter--${starter.id}`} className="my-2 shadow">
                                <Row>
                                    {
                                        starter.id === 1
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://southerndiscourse.com/wp-content/uploads/2020/01/Whipped-Feta-Feature-1-200x200.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        starter.id === 2
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://southerndiscourse.com/wp-content/uploads/2021/03/Bacon-Parmesan-Asparagus-Twists-Dip.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        starter.id === 3
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://southerndiscourse.com/wp-content/uploads/2018/03/BBQ-shrimp-full.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        starter.id === 4
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://southerndiscourse.com/wp-content/uploads/2020/01/Hot-SHrimp-Crab-Dip-title-1.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        starter.id === 5
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://www.tasteofhome.com/wp-content/uploads/2021/11/Charcuterie-Board_TOHcom21_PU6005_E10_27_8b_v2-e1637338122101.jpg?resize=700,700" /></Col>
                                            : ""

                                    }
                                    <Col className="col-8">
                                        <Card.Body>
                                            <Card.Title>{starter.name}</Card.Title>
                                            {
                                                starter.id === 1
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                starter.id === 2
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                starter.id === 3
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                starter.id === 4
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                starter.id === 5
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>)
                    }
                </Row>
                <Card.Body className="text-center bg-dark text-light" size="lg">
                    <h3>Mains</h3>
                </Card.Body>
                <Row className="justify-content-center">
                    {
                        mains.map(main =>
                            <Card style={{ width: '55rem' }} key={`main--${main.id}`} className="my-2 shadow">
                                <Row>
                                    {
                                        main.id === 1
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://themeatandwineco.com/wp-content/uploads/2021/04/MAWC_Autumn_StevenWoodburn-76-768x512.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        main.id === 2
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://magicskillet.com/wp-content/uploads/2012/08/broiled-salmon-steak-with-lemon-butter-recipe.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        main.id === 3
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="http://www.coastalseafoods.com/Assets/braisedmonkfishwithalmonds.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        main.id === 4
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://www.idratherbeachef.com/wp-content/uploads/2016/02/pan-seared-pork-chops-678x1024.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        main.id === 5
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2013%2F09%2F24%2Fpan-seared-chicken-breast-rich-pan-sauce-ck-x.jpg" /></Col>
                                            : ""

                                    }
                                    <Col className="col-8">
                                        <Card.Body>
                                            <Card.Title>{main.name}</Card.Title>
                                            {
                                                main.id === 1
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                main.id === 2
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                main.id === 3
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                main.id === 4
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                main.id === 5
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>)
                    }
                </Row>
                <Card.Body className="text-center bg-dark text-light" size="lg">
                    <h3>Sides</h3>
                </Card.Body>
                <Row className="justify-content-center">
                    {
                        sides.map(side =>
                            <Card style={{ width: '55rem' }} key={`side--${side.id}`} className="my-2 shadow">
                                <Row>
                                    {
                                        side.id === 1
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://www.wellplated.com/wp-content/uploads/2020/12/Roasted-Broccolini-425.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        side.id === 2
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2021-08-Truffle-Fries%2FKitchnKitchn3580-1_01" /></Col>
                                            : ""

                                    }
                                    {
                                        side.id === 3
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://www.eatwell101.com/wp-content/uploads/2021/08/sauteed-garlic-butter-mushrooms-recipe.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        side.id === 4
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://images.themodernproper.com/billowy-turkey/production/posts/2019/Twice-Baked-Potatoes-12.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1599768623&s=30d6eb636afa838f4d8aa848e461b38b" /></Col>
                                            : ""

                                    }
                                    {
                                        side.id === 5
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://www.tasteofhome.com/wp-content/uploads/2021/07/Simple-Roast-Brussels-Sprouts_EXPS_THON21_243014_B06_17_10b.jpg?fit=700,1024" /></Col>
                                            : ""

                                    }
                                    <Col className="col-8">
                                        <Card.Body>
                                            <Card.Title>{side.name}</Card.Title>
                                            {
                                                side.id === 1
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                side.id === 2
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                side.id === 3
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                side.id === 4
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                side.id === 5
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>)
                    }
                </Row>
                <Card.Body className="text-center bg-dark text-light" size="lg">
                    <h3>Desserts</h3>
                </Card.Body>
                <Row className="justify-content-center">
                    {
                        desserts.map(dessert =>
                            <Card style={{ width: '55rem' }} key={`dessert--${dessert.id}`} className="my-2 shadow">
                                <Row>
                                    {
                                        dessert.id === 1
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/76CC275B-9452-408D-A22F-0D028E212CB8/Derivates/3679737E-DE68-45ED-A0CC-C4D61116D277.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        dessert.id === 2
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://assets.bonappetit.com/photos/5cfa7e1e717c5687873eb66c/1:1/w_1920,c_limit/Basically-Strawberry-Shortcake-Beauty.jpg" /></Col>
                                            : ""

                                    }
                                    {
                                        dessert.id === 3
                                            ? <Col className="col-3 py-2"><Card.Img style={{ width: '13rem', height: '10rem' }} src="https://bakingamoment.com/wp-content/uploads/2018/04/IMG_7035-classic-tiramisu-recipe-square.jpg" /></Col>
                                            : ""

                                    }
                                    <Col className="col-8">
                                        <Card.Body>
                                            <Card.Title>{dessert.name}</Card.Title>
                                            {
                                                dessert.id === 1
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                dessert.id === 2
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }
                                            {
                                                dessert.id === 3
                                                    ? <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                                                    : ""
                                            }

                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>)
                    }
                </Row>
            </Card>
        </Container>
    </>
}