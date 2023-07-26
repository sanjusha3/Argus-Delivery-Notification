import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import moment from "moment";

const EmployeeDetails = () => {
    useEffect(() => {
        fetchData();

    }, [])

    const columns = ["Employee ID", "Employee Name", "Email", "Phone", "Packages"]
    const [packageData, setPackageData] = useState([])

    const columnDataFieldMap = {
        "Employee ID": "emp_id",
        "Employee Name": "emp_name",
        "Email": "email",
        "Phone": "phone",
        "Packages": "pkgid"
    };

    const fetchData = async () => {
        await fetch("http://localhost:8000/admin/employee-details/", {
            method: 'GET',
            credentials: 'include',
            // headers: {
            //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNAYXJndXNvZnQuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNjkwMTg4NDAxLCJleHAiOjE2OTAxOTU2MDF9.nXOz1HOIpoAtPG1WriJaZTQp02YZRO6RLLatt9mn0wk`,
            // }
        })
            .then(res => res.json())
            .then(data => {
                setPackageData(data.data);
                console.log(data.data)
            })
    }

    // pkgid, brand, arrival date,received?, received date, receivedby
    return (
        <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: "center", marginBottom: "1rem" }}>
            <Paper sx={{ width: '95%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, columnIndex) => (
                                    // const value = row[column.id];
                                    <TableCell key={columnIndex} align="center">
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packageData.map((row, rowIndex) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                    {columns.map((column, columnIndex) => (
                                        <TableCell key={columnIndex} align="center">{row[columnDataFieldMap[column]] ? row[columnDataFieldMap[column]] : "-"}</TableCell>
                                    ))}
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
        </div>
    );
}

export default EmployeeDetails