function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    }

    if (!values.email) {
        errors.email = 'E-mail is required';
    }

    return errors;
}

export default validate;
