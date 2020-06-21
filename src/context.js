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
            }

        default:
            return state;
    }
}

export class Provider extends Component {

    state = {
        events: [],
        dispatch: action => this.setState(state => reducer(state, action))
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then( res => {
            this.setState({events: res.data})
        } )
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
