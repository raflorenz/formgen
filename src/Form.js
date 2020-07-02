import React, { useState, useEffect } from 'react';
import Success from './Success';
import cars from './cars';
import validate from './validate';
import firebase from './firebase';

const initialState = { name: '', email: '', phone: '', category: '', model: '' };

function Form() {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [activeField, setActiveField] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [models, setModels] = useState([]);
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

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

    const addNewReservation = () => {
        setIsSuccessfullySubmitted(false);
        setIsSubmitted(false);
        setValues(initialState);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitted) {
            firebase
                .firestore()
                .collection('contacts')
                .add(values)
                .then(() => {
                    setIsSuccessfullySubmitted(true);
                });
        }
    }, [values, errors, isSubmitted]);

    return (
        !isSuccessfullySubmitted ? (
            <>
                <form onSubmit={handleSubmit} className={`form ${isSubmitted ? 'submitted' : ''}`} noValidate>
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
                    {values.name && <p><strong>Name:</strong> {values.name}</p>}
                    {values.email && <p><strong>E-mail:</strong> {values.email}</p>}
                    {values.phone && <p><strong>Phone:</strong> {values.phone}</p>}
                    {values.category && <p><strong>Car Category:</strong> {values.category}</p>}
                    {values.model && <p><strong>Car Model:</strong> {values.model}</p>}
                </div>
            </>
        ) : (
            <Success values={values} addNewReservation={addNewReservation} />
        )
    );
}

export default Form;
