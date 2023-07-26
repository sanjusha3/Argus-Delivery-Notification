import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const NavBar = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getCookie('token');

        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const dispatch = useDispatch();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleLogout = async (e) => {
        try {
            await fetch('http://localhost:8000/auth/logout', {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(res => {
                    setIsLoggedIn(false);
                    dispatch({ type: 'SET_TOKEN', payload: false });
                    window.location.href = '/'
                })
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    return (
        <Navbar key='lg' expand='lg' className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand href="#">Argus Deliver</Navbar.Brand>
                {isLoggedIn && (
                    <>
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
                                {props.role === "admin" ?
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link href="/admin/employeeDetails">Employee Details</Nav.Link>
                                        <Nav.Link href="/admin/packageDetails">Employee Packages</Nav.Link>
                                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                    </Nav> :
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Nav.Link href="/employee/packages">All Packages</Nav.Link>
                                        <Nav.Link href="/employee/packages">Notifications</Nav.Link>
                                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                    </Nav>
                                }
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </>
                )}
            </Container>
        </Navbar>
    );
}

const mapStateToProps = state => ({
    role: state.role,
    token: state.token,
});

export default connect(mapStateToProps)(NavBar);