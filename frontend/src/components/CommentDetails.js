import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class CommentDetails extends Component{

    render() {
        let comments = this.props.comments;

        return (
            <span>
                <Grid style={{backgroundColor: '#FFFFFF'}}>
                    <Row className="show-grid">
                        <Col xs={8} md={4}> 
                            <h4>Comments</h4>
                        </Col>       
                        <Col xs={4} md={8}> 
                            <span className="pull-right"> 
                             <Link to={{ pathname: "/comments/add", state: { modal: true }}}><h4>Add</h4></Link> 
                            </span>
                        </Col>       
                    </Row>
                    {comments.map( (comment) => (
                    <Row key={comment.id} className="show-grid">
                        <Col xs={12} md={12}>
                            <span style={{fontWeight: 'bold'}}>{comment.author?comment.author:'anon' }.</span> {comment.body}
                            <br />
                            <br />
                        </Col>    
                    </Row>
                    ))}
                </Grid>
            </span>
        );
    }
}

export default withRouter(CommentDetails);