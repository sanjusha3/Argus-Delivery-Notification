const validators = (emp_id, emp_name, email, phone, password) => {
    // Perform validations
    const errors = {};

    // Validate ID (unique and not null)
    if (!emp_id || emp_id.toString().trim() === '') {
        errors.emp_id = 'ID is required';
    }

    // Validate name (not null)
    if (!emp_name || emp_name.trim() === '') {
        errors.emp_name = 'Employee name is required';
    }

    // Validate email (@argusoft.com compulsory and not null)
    if (!email || email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!email.endsWith('@argusoft.com')) {
        errors.email = 'Invalid email format';
    }

    // Validate phone (10 digits and not null)
    if (!phone || phone.toString().trim() === '') {
        errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
        errors.phone = 'Invalid phone number format';
    }

    // Validate password (minimum 6, maximum 15 characters and contains at least one digit)
    if (!password || password.toString().trim() === '') {
        errors.password = 'Password is required';
    } else if (password.length < 6 || password.length > 15) {
        errors.password = 'Password must be between 6 and 15 characters long';
    }

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
        return errors;
    }
}

module.exports = validators