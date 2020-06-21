import React, { Component } from 'react';
import { Consumer } from '../context';
import TextInputGroup from './TextInputGroup';
import {v4} from 'uuid';
import { Card, Form, Button } from 'react-bootstrap';

export default class AddEvent extends Component {

    state = {
        name: '',
        region: '',
        date: '',
        errors: {}
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = (dispatch, e) => {
        e.preventDefault();
        
        const {name, date, region} = this.state;

        if( !name ) {
            this.setState({errors: {name: 'Name is required.'}});
            return;
        }

        if( !region ) {
            this.setState({errors: {region: 'Region is required.'}});
            return;
        }

        if( !date ) {
            this.setState({errors: {date: 'Date is required.'}});
            return;
        }

        const newEvent = {
            id: v4(),
            name,
            region,
            date
        }

        dispatch({
            type: 'ADD_EVENT',
            payload: newEvent
        });

        this.setState({
            name: '',
            region: '',
            date: '',
            errors: {}
        });

        this.props.history.push('/');
    }

    render() {
        const { name, date, region, errors } = this.state;

        return (
            <Consumer>
                {value => {
                  const {dispatch} = value;
                  return (
                    <Card className="mb-3">
                        <Card.Header>
                            <h5>Add Event</h5>
                        </Card.Header>
                        <Card.Body>
        
                            <Form onSubmit={this.onSubmit.bind(this, dispatch)}>

                                <TextInputGroup
                                    label="Name"
                                    name="name"
                                    placeholder="Enter event name"
                                    value={name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />

                                <TextInputGroup
                                    label="Region"
                                    name="region"
                                    placeholder="Enter event region"
                                    value={region}
                                    onChange={this.onChange}
                                    error={errors.region}
                                />
        
                                <TextInputGroup
                                    label="Date"
                                    name="date"
                                    placeholder="Enter event date"
                                    value={date}
                                    onChange={this.onChange}
                                    error={errors.date}
                                />

                                <Button variant="primary" type="submit" className="btn-block">
                                    Add Event
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
