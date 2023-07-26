import React, { useEffect, useState, Redirect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
// import { InfoOutlined } from "@mui/icons-material";
import { BiInfoCircle } from "react-icons/bi"

const Signup = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.token) {
            navigate(props.role === "employee" ? "/employee/packages" : "/admin/employeeDetails");
        }
    }, [props.token]);
    const [signupFormData, setSignupFormData] = useState({
        emp_id: '', emp_name: '', email: '', phone: '', pswd: ''
    });

    const [signUpErrors, setSignUpErrors] = useState({
        emp_id: "", emp_name: "", email: "", phone: "", pswd: ""
    })

    const handleSignupChange = (event) => {
        const { name, value } = event.target;
        setSignupFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setSignUpErrors((prevData) => ({
            ...prevData,
            [name]: ""
        }))
    };

    const handleSignupFormSubmit = (event) => {
        event.preventDefault()
        try {
            fetch("http://localhost:8000/auth/register",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupFormData),
                }
            )
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        navigate("/");
                    } else {
                        setSignUpErrors(data.error);
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSignupFormSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <Link to={"/"} className="link-primary">
                            Sign In
                        </Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>Employee ID</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            name="emp_id"
                            value={signupFormData.emp_id}
                            onChange={handleSignupChange}
                        />
                        {signUpErrors.emp_id && <span className="error-message text-danger"><BiInfoCircle size={20} /> {signUpErrors.emp_id}</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            name="emp_name"
                            value={signupFormData.emp_name}
                            onChange={handleSignupChange}
                        />
                        {signUpErrors.emp_name && <span className="error-message text-danger"><BiInfoCircle size={20} /> {signUpErrors.emp_name}</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            name="email"
                            value={signupFormData.email}
                            onChange={handleSignupChange}
                        />
                        {signUpErrors.email && <span className="error-message text-danger"><BiInfoCircle size={20} /> {signUpErrors.email}</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Phone number</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            name="phone"
                            value={signupFormData.phone}
                            onChange={handleSignupChange}
                        />
                        {signUpErrors.phone && <span className="error-message text-danger"><BiInfoCircle size={20} /> {signUpErrors.phone}</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            name="pswd"
                            value={signupFormData.pswd}
                            onChange={handleSignupChange}
                        />
                        {signUpErrors.pswd && <span className="error-message text-danger"><BiInfoCircle size={20} /> {signUpErrors.pswd}</span>}
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot password?
                    </p>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    role: state.role,
    token: state.token,
});

export default connect(mapStateToProps)(Signup)