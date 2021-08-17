import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RocketDetails from './components/RocketDetails'
import { fetchRocketDetails, rocketDetailsSelector } from './slices/fetchRocketDetails'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
    const dispatch = useDispatch()
    const {rocketDetails, loading, hasErrors } = useSelector(rocketDetailsSelector)

    useEffect(() => {
        dispatch(fetchRocketDetails())
    }, [dispatch])

    const rocketList = () => {
        if (loading) return <p>Loading posts...</p>
        if (hasErrors) return <p>Unable to display posts.</p>
        return (<Col xs={12} sm={12} md={6} lg={9}>
            <Row>
                {rocketDetails.map(details => (
                    <Col md={12} lg={4}>
                        <RocketDetails details={details} />
                    </Col>
                ))}
            </Row>
        </Col>
        )
    }
    return (
        <Container fluid>
            <Row>
                {rocketList()}
            </Row>
        </Container>
    )
}

export default App
