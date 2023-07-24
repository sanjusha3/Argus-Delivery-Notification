import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getCookie('token');

        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleLogout = async (e) => {
        try {
            await fetch('http://localhost:8080/auth/logout', {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(res => {
                    window.location.href = '/'
                    setIsLoggedIn(false);
                })
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    return (
        <Navbar key='lg' expand='lg' className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand href="#">Argus Deliver</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-$'lg'`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                Offcanvas
                            </Offcanvas.Title> */}
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {isLoggedIn && (
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {/* {isLoggedIn ?
                                <>
                                    <Nav.Link href="/signup">Signup</Nav.Link>
                                    <Nav.Link href="/">Login</Nav.Link>
                                </> :
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            } */}
                                <Nav.Link href="/employee/packageDetails">All Packages</Nav.Link>
                                <Nav.Link href="/employee/packageDetails">Notifications</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                        )}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NavBar;