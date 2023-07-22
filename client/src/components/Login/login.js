
import React, { useState } from "react"

const SignupLogin = (props) => {
    let [authMode, setAuthMode] = useState("signin")
    const [signupFormData, setSignupFormData] = useState({
        emp_id: '', emp_name: '', email: '', phone: '', pswd: ''
    });

    const [loginFormData, setLoginFormData] = useState({
        email: '', pswd: ''
    });

    const handleSignupChange = (event) => {
        const { name, value } = event.target;
        setSignupFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSignupFormSubmit = (event) => {
        event.preventDefault()
        // console.log(signupFormData)
        try {
            fetch("http://localhost:8080/auth/register",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type of the request body
                    },
                    body: JSON.stringify(signupFormData),
                }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleLoginFormSubmit = (event) => {
        event.preventDefault()
        // console.log(signupFormData)
        try {
            fetch("http://localhost:8080/auth/login",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type of the request body
                    },
                    body: JSON.stringify(loginFormData),
                }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleLoginFormSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
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
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSignupFormSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
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
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignupLogin