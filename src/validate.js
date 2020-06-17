function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name is required (please fill out this field)';
    } else if (!/^[a-z ,.'-]{2,}$/i.test(values.name)) {
        errors.name = 'Name is invalid (valid name must be atleast 2 characters and cannot contain numbers and special characters except [-,.\'])';
    }

    if (!values.email) {
        errors.email = 'E-mail is required (please fill out this field)';
    } else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) {
        errors.email = 'E-mail is invalid (please enter your e-mail in this format [name@example.com])';
    }

    if (values.phone && !/([0-9\s-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(values.phone)) {
        errors.phone = 'Phone number is invalid (please enter a valid phone number in one of these formats [+442081900454, +44 20 819 00 454, +44-20-819-00-454, (+44) 20 819 00 454])';
    }

    if (!values.category) {
        errors.category = 'Car category is required (please fill out this field)';
    }

    if (!values.model) {
        errors.model = 'Car model is required (please fill out this field)';
    }

    return errors;
}

export default validate;
