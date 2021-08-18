import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RocketDetails from './components/RocketDetails';
import {
  fetchRocketDetails,
  rocketDetailsSelector,
} from './slices/fetchRocketDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const App = () => {
  const dispatch = useDispatch();
  const initialValues = {
    items: [],
    isLoaded: false,
    filters: {
      limit: 150,
      launch_year: undefined,
      launch_success: undefined,
      land_success: undefined,
    },
  };
  const [values, setValues] = useState(initialValues);
  const uniqueLaunchYears = new Array(16)
    .fill(0)
    .map((_, index) => 2006 + index);
  const { rocketDetails, loading, hasErrors } = useSelector(
    rocketDetailsSelector
  );

  useEffect(() => {
    dispatch(fetchRocketDetails());
  }, [dispatch]);

  const updateApiFilters = (type, value) => {
    if (values.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...values,
      [type]: value,
    };
    //TODO
    //Add logic to filter data
  };
  const rocketList = () => {
    if (loading) return <p>Loading posts...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;
    return (
      <Row>
        {rocketDetails.map((details) => (
          <Col md={12} lg={4}>
            <RocketDetails details={details} />
          </Col>
        ))}
      </Row>
    );
  };
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={6} lg={3}>
          <Card className="App-filter-card">
            <Card.Body>
              <Card.Title className="App-filter-header">Filters</Card.Title>
              <Card.Text className="App-filter-heading-launch-year">
                Launch Year
                <hr className="App-filters-hr" />
              </Card.Text>

              <Row>
                <div className="App-filter-button-container">
                  {uniqueLaunchYears.map((year) => {
                    return (
                      <Button
                        className="App-filter-button"
                        variant={
                          values.filters.launch_year === year.toString()
                            ? 'success'
                            : 'outline-success'
                        }
                        value={year}
                        onClick={(e) =>
                          updateApiFilters('launch_year', e.target.value)
                        }
                      >
                        {year}
                      </Button>
                    );
                  })}
                </div>
              </Row>

              <Card.Text className="App-filter-heading">
                Successful Launch
                <hr className="App-filters-hr" />
              </Card.Text>

              <div className="App-filter-button-container">
                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.launch_success === 'true'
                      ? 'success'
                      : 'outline-success'
                  }
                  onClick={(e) =>
                    updateApiFilters('launch_success', e.target.value)
                  }
                  value="true"
                >
                  True
                </Button>

                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.launch_success === 'false'
                      ? 'success'
                      : 'outline-success'
                  }
                  onClick={(e) =>
                    updateApiFilters('launch_success', e.target.value)
                  }
                  value="false"
                >
                  False
                </Button>
              </div>

              <Card.Text className="App-filter-heading">
                Successful Landing
                <hr className="App-filters-hr" />
              </Card.Text>
              <div className="App-filter-button-container">
                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.land_success === 'true'
                      ? 'success'
                      : 'outline-success'
                  }
                  onClick={(e) =>
                    updateApiFilters('land_success', e.target.value)
                  }
                  value="true"
                >
                  True
                </Button>

                <Button
                  className="App-filter-button"
                  variant={
                    values.filters.land_success === 'false'
                      ? 'success'
                      : 'outline-success'
                  }
                  onClick={(e) =>
                    updateApiFilters('land_success', e.target.value)
                  }
                  value="false"
                >
                  False
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={9}>
          {rocketList()}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
