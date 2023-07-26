import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const NewPackageModal = () => {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        pkg_brand: '', empname: ''
    });

    const [Errors, setErrors] = useState({
        pkg_brand: '', empname: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(name)
        setErrors((prevData) => ({
            ...prevData,
            [name]: ""
        }))
    };

    const handleClose = () => {
        setShow(false)
    }


    const handleSubmit = () => {
        try {
            fetch("http://localhost:8080/admin/add-new-package",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.status) {
                    } else {
                        setErrors(data.error);
                    }
                    // console.log(Errors)
                })
        }
        catch (err) {
            console.log(err)
        }
        setShow(false)
        window.location.reload();
    };
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="success" className='p-3' onClick={handleShow}>
                Add New Package
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Package Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Package Brand</Form.Label>
                            <Form.Control
                                name="pkg_brand"
                                type="text"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Name (add a select option)</Form.Label>
                            <Form.Control
                                name="empname"
                                type="text"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div>**Handle errors also**</div>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                            />
                        </Form.Group> */}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewPackageModal;