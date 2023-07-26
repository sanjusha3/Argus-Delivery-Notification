import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from "moment";

const Packages = () => {
    useEffect(() => {
        fetchData();

    }, [])

    const columns = ["Package ID", "Brand", "Arrival Date", "isReceived", "Received Date", "Received By"]
    const [packageData, setPackageData] = useState([])

    const columnDataFieldMap = {
        "Package ID": "pkg_id",
        "Brand": "pkg_brand",
        "Arrival Date": "date",
        "isReceived": "pkg_received",
        "Received Date": "pkg_received_date",
        "Received By": "pkg_receivedby",
    };

    const fetchData = async () => {
        await fetch("http://localhost:8000/employee/get-employee-packages/Zainab raja", {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                data.data.map(pkg => {
                    if (pkg.date) {
                        pkg.date = moment.utc(pkg.date).format("DD-MM-YYYY HH:mm:ss");
                    }
                })
                setPackageData(data.data);
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

export default Packages