
import React, { useEffect, useState, Redirect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { BiInfoCircle } from "react-icons/bi"
import { useDispatch } from 'react-redux';

const Login = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.token) {
            navigate(props.role === "employee" ? "/employee/packages" : "/admin/employeeDetails");
        }
    }, [props.token]);

    const [loginFormData, setLoginFormData] = useState({
        email: '', pswd: ''
    });

    const [loginErrors, setLoginErrors] = useState({
        email: "", pswd: ""
    })

    const dispatch = useDispatch();

    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setLoginErrors((prevData) => ({
            ...prevData,
            [name]: ""
        }))
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault()
        try {
            await fetch("http://localhost:8000/auth/login",
                {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginFormData),
                }
            )
                .then(res => res.json())
                .then(data => {
                    if (data.status) {
                        const role = data.employee.role === "admin" ? "admin" : "employee";
                        dispatch({ type: 'SET_ROLE', payload: role });
                        dispatch({ type: 'SET_TOKEN', payload: true });
                        navigate(`/${role === "admin" ? "admin/employeeDetails" : "employee/packages"}`);
                    } else {
                        setLoginErrors(data.error);
                        dispatch({ type: 'SET_TOKEN', payload: false });
                    }

                })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLoginFormSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <Link to={"/signup"} className="link-primary">
                            Sign Up
                        </Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            name="email"
                            value={loginFormData.email}
                            onChange={handleLoginChange}
                        />
                        {loginErrors.email && <span className="error-message text-danger"><BiInfoCircle size={20} /> {loginErrors.email}</span>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            name="pswd"
                            value={loginFormData.pswd}
                            onChange={handleLoginChange}
                        />
                        {loginErrors.pswd && <span className="error-message text-danger"><BiInfoCircle size={20} /> {loginErrors.pswd}</span>}
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

export default connect(mapStateToProps)(Login)