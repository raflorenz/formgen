import React, { useState, useEffect } from 'react';
import validate from './validate';
import cars from './cars';

const initialState = { name: '', email: '', phone: '', category: '', model: '' };

function Form() {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [activeField, setActiveField] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [models, setModels] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
        
        setValues({
            ...values,
            [name]: value
        });

        if (name === 'category') {
            if (value) {
                setModels(cars.find(car => car.category === value).models);
                setValues({
                    ...values,
                    category: value,
                    model: ''
                });
            } else {
                setModels([]);
                setValues({
                    ...values,
                    category: '',
                    model: ''
                });
            }
        }
    };

    const handleBlur = e => {
        setErrors(validate(values));
        setActiveField(e.target.name);
        setIsSubmitting(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
        setActiveField('');
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            console.log('Form submitted successfully');
            setValues(initialState);
        }
    }, [errors, isSubmitting]);

    return (
        <>
            <form onSubmit={handleSubmit} className={`form ${isSubmitting ? 'submitted' : ''}`} noValidate>
                <fieldset>
                    <legend>Car Reservation</legend>
                    <div className={`form-group ${activeField === 'name' ? 'active' : 'inactive'} ${errors.name ? 'invalid' : ''}`}>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            className="form-control"
                            placeholder="Name *"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className={`form-group ${activeField === 'email' ? 'active' : 'inactive'} ${errors.email ? 'invalid' : ''}`}>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            className="form-control"
                            placeholder="E-mail *"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className={`form-group ${activeField === 'phone' ? 'active' : 'inactive'} ${errors.phone ? 'invalid' : ''}`}>
                        <input
                            type="text"
                            name="phone"
                            value={values.phone}
                            className="form-control"
                            placeholder="Phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>
                    <div className={`form-group ${activeField === 'category' ? 'active' : 'inactive'} ${errors.category ? 'invalid' : ''}`}>
                        <select
                            name="category"
                            value={values.category}
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="">Car Category *</option>
                            {cars.map(car => <option key={car.id} value={car.category}>{car.category}</option>)}
                        </select>
                        {errors.category && <p className="error">{errors.category}</p>}
                    </div>
                    <div className={`form-group ${activeField === 'model' ? 'active' : 'inactive'} ${errors.model ? 'invalid' : ''}`}>
                        <select
                            name="model"
                            value={values.model}
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="">Car Model *</option>
                            {models.map(model => <option key={model} value={model}>{model}</option>)}
                        </select>
                        {errors.model && <p className="error">{errors.model}</p>}
                    </div>
                    <button className="form-control">Submit</button>
                </fieldset>
            </form>

            <div className="form-values">
                {values.name && <p>Name: {values.name}</p>}
                {values.email && <p>E-mail: {values.email}</p>}
                {values.phone && <p>Phone: {values.phone}</p>}
                {values.category && <p>Car Category: {values.category}</p>}
                {values.model && <p>Car Model: {values.model}</p>}
            </div>
        </>
    );
}

export default Form;
