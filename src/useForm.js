import { useState, useEffect } from 'react';

function useForm(initialFormValues, submitCallback, validate, categoryCallback) {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [activeField, setActiveField] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleChange = e => {
        const { name, value } = e.target;
        
        setValues({
            ...values,
            [name]: value
        });

        if (name === 'category') {
            categoryCallback(value);
        }
        
        setActiveField('');
        setIsSubmitted(false);
    };

    const handleBlur = e => {
        setErrors(validate(values));
        setActiveField(e.target.name);
        setIsSubmitted(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitted(true);
        setActiveField('');
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitted) {
            submitCallback();
        }
    }, [errors, isSubmitted, submitCallback]);

    return {
        values,
        errors,
        activeField,
        isSubmitted,
        setValues,
        setIsSubmitted,
        handleChange,
        handleBlur,
        handleSubmit
    };
}

export default useForm;
