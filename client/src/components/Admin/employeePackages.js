import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from 'react-bootstrap/Modal'
import moment from "moment";
import NewPackageModal from "./newPackageModal";

const EmployeePackages = () => {
    useEffect(() => {
        fetchData();

    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };


    const columns = ["Package ID", "Brand", "Employee ID", "Employee Name", "Arrival Date", "isReceived", "Received Date", "Received By"]
    const [packageData, setPackageData] = useState([])

    const columnDataFieldMap = {
        "Package ID": "pkg_id",
        "Brand": "pkg_brand",
        "Employee ID": "emp_id",
        "Employee Name": "empname",
        "Arrival Date": "date",
        "isReceived": "pkg_received",
        "Received Date": "pkg_received_date",
        "Received By": "pkg_receivedby"
    };

    const fetchData = async () => {
        await fetch("http://localhost:8000/admin/getAllPackages/", {
            method: 'GET',
            credentials: 'include',
            // headers: {
            //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNAYXJndXNvZnQuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNjkwMTg4NDAxLCJleHAiOjE2OTAxOTU2MDF9.nXOz1HOIpoAtPG1WriJaZTQp02YZRO6RLLatt9mn0wk`,
            // }
        })
            .then(res => res.json())
            .then(data => {
                data.data.map(pkg => {
                    console.log(pkg)
                    if (pkg.pkg_received_date) {
                        pkg.pkg_received_date = moment.utc(pkg.pkg_received_date).format("DD-MM-YYYY HH:mm:ss");
                    }
                    if (pkg.date) {
                        pkg.date = moment.utc(pkg.date).format("DD-MM-YYYY HH:mm:ss");
                    }
                })
                setPackageData(data.data);
                console.log(data.data)
                console.log(packageData)
            })
    }

    // pkgid, brand, arrival date,received?, received date, receivedby
    return (
        <div style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "center", marginBottom: "1rem" }}>
            <Paper sx={{ width: '95%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: "600px" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, columnIndex) => (
                                    // const value = row[column.id];
                                    <TableCell key={columnIndex} align="center">
                                        {column}
                                    </TableCell>
                                ))}
                                {/* <TableCell key="create" align="center"> */}
                                {/* </TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packageData.map((row, rowIndex) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                    {columns.map((column, columnIndex) => (
                                        <TableCell key={columnIndex} align="center">{row[columnDataFieldMap[column]] ? row[columnDataFieldMap[column]] : "-"}</TableCell>
                                    ))}
                                    {/* <TableCell key="create" align="center">
                                        <Button variant="success">Add New Package</Button>
                                </TableCell>  */}
                                </TableRow>
                            ))}
                            {/* {packageData.map((row, rowIndex) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                    {columns.map((column, columnIndex) => {
                                        if (column !== "Packages") {
                                            return (
                                                <TableCell key={columnIndex} align="center">
                                                    {row[columnDataFieldMap[column]] ? row[columnDataFieldMap[column]] : "-"}
                                                </TableCell>
                                            );
                                        } else {
                                            return row[columnDataFieldMap[column]].join(', ')
                                        }
                                    })}
                                </TableRow>
                            ))} */}


                        </TableBody>
                    </Table>

                </TableContainer>
            </Paper>
            <div className="mt-4">
                <NewPackageModal openModal={openModal} />
                {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
            </div>
        </div >
    );
}

export default EmployeePackages