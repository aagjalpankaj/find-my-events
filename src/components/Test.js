import React, { Component } from 'react'

export default class Test extends Component {

    state = {
        title: 'Loading...',
        body: 'Loading...'
    }

   /*  componentDidMount() {
        console.log('componentDidMount');
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUpdate() {
        console.log('componentWillUpdate');
    } */

    componentDidMount() {
        console.log('componentDidMount');

        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(data => {
            this.setState({
                title: data.title,
                body: data.body
            })
        })

    }

    render() {
        console.log('render');
        const { title, body } = this.state;
        return (
            <div>
                <h1>This is a test component...</h1>
                <p>
                    <b>Title:</b> {title}
                </p>
                <p>
                <b>Body:</b> {body}
                </p>
            </div>
        )
    }
}
