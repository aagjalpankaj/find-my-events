import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../context';
import axios from 'axios';

import { Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faTimes } from '@fortawesome/free-solid-svg-icons';

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

    onDeleteClick = (id, dispatch) => {

        axios.delete(`http://jsonplaceholder.typicode.com/posts/${id}`, {mode: 'cors',
        credentials: 'include'})
        .then( res => {
            dispatch({
                type: 'DELETE_EVENT',
                payload: id
            })
        } )

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
                                        {event.title}
                                        <FontAwesomeIcon
                                            icon={faSortDown}
                                            onClick={this.onShowClick.bind(this, event.id)}
                                            className=""
                                        />

                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            onClick={this.onDeleteClick.bind(this, event.id, dispatch)}
                                            className="action"
                                        />
                                    </h4>
                                </Card.Header>
                                {showEventInfo ?
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroup.Item>Organizer ID: {event.userId}</ListGroup.Item>
                                            <ListGroup.Item>Body: {event.body}</ListGroup.Item>
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
