import React, { useState, useEffect } from 'react';
import validate from './validate';
import cars from './cars';

const initialState = { name: '', email: '', phone: '', category: '', model: '' };

function Form() {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
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

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            console.log('Form submitted successfully');
            setValues(initialState);
        }
    }, [errors, isSubmitting]);

    return (
        <>
            <form onSubmit={handleSubmit} className="form" noValidate>
                <fieldset>
                    <legend>Car Reservation</legend>
                    <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                            onChange={handleChange}
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            className="form-control"
                            placeholder="E-mail"
                            onChange={handleChange}
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                        <input
                            type="text"
                            name="phone"
                            value={values.phone}
                            className="form-control"
                            placeholder="Phone"
                            onChange={handleChange}
                        />
                        {errors.phone && <p>{errors.phone}</p>}
                    </div>
                    <div className={`form-group ${errors.category ? 'has-error' : ''}`}>
                        <select
                            name="category"
                            value={values.category}
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option value="">Car Category</option>
                            {cars.map(car => <option key={car.id} value={car.category}>{car.category}</option>)}
                        </select>
                        {errors.category && <p>{errors.category}</p>}
                    </div>
                    <div className={`form-group ${errors.model ? 'has-error' : ''}`}>
                        <select
                            name="model"
                            value={values.model}
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option value="">Car Model</option>
                            {models.map(model => <option key={model} value={model}>{model}</option>)}
                        </select>
                        {errors.model && <p>{errors.model}</p>}
                    </div>
                    <button className="form-control">Submit</button>
                </fieldset>
            </form>

            <div className="form-values">
                <p>Name: {values.name}</p>
                <p>E-mail: {values.email}</p>
                <p>Phone: {values.phone}</p>
                <p>Car Category: {values.category}</p>
                <p>Car Model: {values.model}</p>
            </div>
        </>
    );
}

export default Form;
