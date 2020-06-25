import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_EVENT':
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.payload)
            };

        case 'ADD_EVENT':
            return {
                ...state,
                events: [action.payload, ...state.events]
            };

        case 'UPDATE_EVENT':
            return {
                ...state,
                events: state.events.map(event => event.id === action.payload.id ? (event = action.payload) : event)
            };

        default:
            return state;
    }
}

export class Provider extends Component {

    state = {
        events: [],
        dispatch: action => this.setState(state => reducer(state, action))
    }

    async componentDidMount() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.setState({events: res.data});
    }

    render() {
        return (

            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
