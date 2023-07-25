import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import moment from "moment";

const AdminPackages = () => {
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
        "Packages": "pkg_id"
    };

    const fetchData = async () => {
        await fetch("http://localhost:8080/admin/employee-details/sas", {
            method: 'GET',
            credentials: 'include',
            // headers: {
            //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNAYXJndXNvZnQuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNjkwMTg4NDAxLCJleHAiOjE2OTAxOTU2MDF9.nXOz1HOIpoAtPG1WriJaZTQp02YZRO6RLLatt9mn0wk`,
            // }
        })
            .then(res => res.json())
            .then(data => {
                data.data.map(pkg => {
                    // console.log(pkg)
                    // pkg.date = moment.utc(pkg.date).format("DD-MM-YYYY HH:mm:ss");
                    // if (pkg.pkg_received_date) {
                    //     pkg.pkg_received_date = moment.utc(pkg.pkg_received_date).format("DD-MM-YYYY HH:mm:ss");
                    // }
                })
                setPackageData(data.data);
                console.log(packageData)
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default AdminPackages