import React, { Component } from 'react';
import Event from './Event';

import {Consumer} from '../context';

export default class Events extends Component {

    render() {

        return (
            <Consumer>
                {
                    value => {
                        const { events } = value;
                        return (
                            <React.Fragment>
                                {events.map( event => (
                                    <Event
                                        key={event.id}
                                        event={event}
                                    />
                                ) )}                
                            </React.Fragment>
                        )
                    }
                }
            </Consumer>
        );
    }
}
