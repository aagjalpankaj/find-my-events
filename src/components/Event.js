import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

class Event extends Component {

    state = {
        showEventInfo: true
    }

    static propTypes = {
        event: PropTypes.object.isRequired
    }

    onShowClick = e => {
        this.setState( { showEventInfo: !this.state.showEventInfo } );
    };

    onDeleteClick = async (id, dispatch) => {
        
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            dispatch({ type: 'DELETE_EVENT', payload: id });
        } catch(e) {
            dispatch({ type: 'DELETE_EVENT', payload: id });
        }
        
    };

    render() {

        const { event } = this.props;
        const { showEventInfo } = this.state;

        return (

            <Consumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <Card className="mb-3">
                                <Card.Header>
                                    <h4>
                                        <span className="dot3">{event.title}</span>

                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            onClick={this.onDeleteClick.bind(this, event.id, dispatch)}
                                            className="action"
                                        />

                                        <Link to={`event/edit/${event.id}`}>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="action"
                                            />
                                        </Link>
                                    </h4>
                                </Card.Header>
                                {showEventInfo ?
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroup.Item>Event ID: {event.id}</ListGroup.Item>
                                            <ListGroup.Item>Added By (User ID): {event.userId}</ListGroup.Item>
                                            <ListGroup.Item>Event Details: {event.body}</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                : null}
                            </Card>
                        )
                    }
                }
            </Consumer>
            
        )
    }
}

export default Event;
