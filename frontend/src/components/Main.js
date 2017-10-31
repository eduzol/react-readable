import React, { Component } from 'react';
import { Grid, Jumbotron, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PostList from './PostList';
import CategoriesList from './CategoriesList';

class Main extends Component {
    

    render () {
        
        let categories = this.props.categories;
        let posts = this.props.posts;

        return (
            <Jumbotron>
                <Grid>
                    <Row className="show-grid">
                    <Col md={4}><br/> </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={4} md={2}>
                            <CategoriesList categories={categories} />
                        </Col>
                        <Col xs={12} md={10}>
                            <PostList posts={posts} />
                        </Col>     
                    </Row>
                </Grid> 
            </Jumbotron>
        );

    }
    
}
    
export default withRouter((Main));
    