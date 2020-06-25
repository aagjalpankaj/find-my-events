import React, { Component } from 'react';
import { Consumer } from '../context';
import TextInputGroup from './TextInputGroup';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

export default class AddEditEvent extends Component {

    state = {
        id: '',
        title: '',
        body: '',
        userId: '',
        errors: []
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    async componentDidMount() {
        const { id } = this.props.match.params;

        if( id ) {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

            const event = res.data;

            this.setState({
                id: event.id,
                title: event.title,
                body: event.body,
                userId: event.userId
            });
        }
    }

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        
        const { title, body, userId} = this.state;

        let valid = true;
        let errors = [];

        if( !title ) {
            errors.title =  'Title is required.';
            valid = false;
        }

        if( !body ) {
            errors.body =  'Details are required.';
            valid = false;
        }

        if( !userId ) {
            errors.userId =  'User ID is required.';
            valid = false;
        }

        this.setState({ errors: errors });

        if( !valid ) {
            return;
        }

        const theEvent = {
            title,
            body,
            userId
        }

        const { id } = this.props.match.params;

        if(id) {
            const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, theEvent);
        
            dispatch({
                type: 'UPDATE_EVENT',
                payload: res.data
            });
        } else {
            const res = await axios.post('https://jsonplaceholder.typicode.com/posts', theEvent);

            dispatch({
                type: 'ADD_EVENT',
                payload: res.data
            });
        }

        // Clear state
        this.setState({
            title: '',
            body: '',
            userId: '',
            errors: {}
        });

        this.props.history.push('/');
    }

    render() {
        const { id, title, body, userId, errors } = this.state;

        return (
            <Consumer>
                {value => {
                  const {dispatch} = value;
                  let header = 'Add Event';
                  let submitLabel = 'Add Event';

                  if(id) {
                    header = 'Edit Event';
                    submitLabel = 'Update Event';
                  }

                  return (
                    <Card className="mb-3">
                        <Card.Header>
                            <h5>{header}</h5>
                        </Card.Header>
                        <Card.Body>
        
                            <Form onSubmit={this.onSubmit.bind(this, dispatch)}>

                                <TextInputGroup
                                    label="Title"
                                    name="title"
                                    placeholder="Enter event title"
                                    value={title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />

                                <TextInputGroup
                                    label="Details"
                                    name="body"
                                    placeholder="Enter event details"
                                    value={body}
                                    onChange={this.onChange}
                                    error={errors.body}
                                />
        
                                <TextInputGroup
                                    label="User ID"
                                    type="number"
                                    name="userId"
                                    placeholder="Enter user ID"
                                    value={userId}
                                    onChange={this.onChange}
                                    error={errors.userId}
                                />

                                <Button variant="primary" type="submit" className="btn-block">
                                    {submitLabel}
                                </Button>
                            </Form>
        
                        </Card.Body>
                    </Card>
                  )
                }}
            </Consumer>
        )

    }
}
