import React, { useEffect } from "react";
// import router from "../../../../server/routes/employee.route";

const EmployeePackages = () => {

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/employee/get-employee-packages/Sanjusha", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNAYXJndXNvZnQuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNjkwMTg4NDAxLCJleHAiOjE2OTAxOTU2MDF9.nXOz1HOIpoAtPG1WriJaZTQp02YZRO6RLLatt9mn0wk`,
            }
        })

        console.log(response);
    }

    useEffect(() => {
        fetchData();

    }, [])

    return (
        <div>
            employee packages page.
        </div>
    )
}






export default EmployeePackages