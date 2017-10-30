import React, { Component } from 'react';
import { Grid, Navbar, Row, Col, ButtonToolbar , Button } from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';

class Header extends Component {

    render () {
         
        return (

            <Navbar inverse fixedTop>
                <Grid>
                <Row className="show-grid">
                    <Col xs={8} md={4}> 
                        <Navbar.Header>
                            <Navbar.Brand>
                            <Link to="/reader/categories/all" >
                            Readable
                            </Link>
                            </Navbar.Brand>
                        <Navbar.Toggle />
                        </Navbar.Header>
                    </Col>
                    <Col xs={4} md={8}>
                    <span className="pull-right"> 
                    <Navbar.Header>
                    <Navbar.Brand>
                        <ButtonToolbar>
                        <Link to={{ pathname: "/new", state: { modal: true }}}>
                        <Button bsSize="small"  bsStyle="primary" active onClick={this.openPostModal}>Post Something</Button>
                        </Link>
                        </ButtonToolbar>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                    </span>
                    </Col>
                    <Col xsHidden md={4}> </Col>
                </Row>
                </Grid>
            </Navbar>
        );
    }
}

export default withRouter((Header));
