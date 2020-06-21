import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Header = props => {

    const { branding } = props;

    return (
        <Navbar bg="primary" variant="dark" className="mb-3">
            <Navbar.Brand href="/">{branding}</Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            <Nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/event/add" className="nav-link">Add Event</Link>
                <Link to="/about" className="nav-link">About</Link>
            </Nav>
        </Navbar>
    )
}

Header.defaultProps = {
    branding: 'My React App'
}

Header.propTypes = {
    branding: PropTypes.string.isRequired
}

export default Header;
