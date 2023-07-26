import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BiInfoCircle } from "react-icons/bi"


const NewPackageModal = () => {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        pkg_brand: '', empname: ''
    });
    const [errors, setErrors] = useState({
        pkg_brand: '', empname: ''
    })

    const [empNames, setEmpNames] = useState([])

    useEffect(() => {
        getEmployeeNames()
    }, [])

    const getEmployeeNames = async () => {
        await fetch("http://localhost:8000/admin/get-employee-names/", {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                const empNames = []
                if (data.status) {
                    data.data.map(emp => {
                        empNames.push(emp.emp_name)
                    })
                    setEmpNames(empNames)
                }
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: ""
        }))
    };

    const handleClose = () => {
        setFormData({ pkg_brand: "", empname: "" })
        setErrors({ pkg_brand: "", empname: "" })
        setShow(false)
    }

    const handleSubmit = async () => {
        if (formData.pkg_brand.length === 0) {
            await setErrors({ pkg_brand: "Please enter a brand name" })
        } else if (formData.empname.length === 0) {
            await setErrors({ empname: "Please select an employee" })
        } else {
            try {
                await fetch("http://localhost:8000/admin/add-new-package",
                    {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        if (data.status) {
                            setShow(false)
                            window.location.reload();
                        }
                    })
            }
            catch (err) {
                console.log(err)
            }
        }
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
                                className='py-3'
                                name="pkg_brand"
                                type="text"
                                onChange={handleChange}
                            />
                            {errors.pkg_brand && <span className="error-message text-danger"><BiInfoCircle size={20} /> {errors.pkg_brand}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Employee Name</Form.Label>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Choose a name</InputLabel>
                                <Select
                                    name='empname'
                                    value={formData.empname}
                                    label="Choose a name"
                                    onChange={handleChange}
                                >
                                    {empNames.map((empName, nameIndex) => {
                                        return (<MenuItem key={nameIndex} value={empName}>{empName}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                            {errors.empname && <span className="error-message text-danger"><BiInfoCircle size={20} /> {errors.empname}</span>}
                        </Form.Group>
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