import React, { useState, useCallback } from 'react';
import useForm from './useForm';
import Loader from './Loader';
import Success from './Success';
import cars from './cars';
import validate from './validate';
import firebase from './firebase';

const initialFormValues = { name: '', email: '', phone: '', category: '', model: '' };
let selectCategory, submitForm, backToForm;

function Form() {
    const { values, errors, activeField, isSubmitted, setValues, setIsSubmitted, handleChange, handleBlur, handleSubmit } = useForm(initialFormValues, submitForm, validate, selectCategory);
    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

    selectCategory = categoryValue => {
        if (categoryValue) {
            setModels(cars.find(car => car.category === categoryValue).models);
            setValues({
                ...values,
                category: categoryValue,
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
    };

    submitForm = useCallback(
        () => {
            setIsLoading(true);

            firebase
                .firestore()
                .collection('contacts')
                .add(values)
                .then(() => {
                    setIsLoading(false);
                    setIsSuccessfullySubmitted(true);
                });
        },
        [values],
    );

    backToForm = () => {
        setIsSuccessfullySubmitted(false);
        setIsSubmitted(false);
        setValues(initialFormValues);
        setModels([]);
    };

    return (
        !isSuccessfullySubmitted ? (
            <>
                <form onSubmit={handleSubmit} className={`form${isSubmitted ? ' submitted' : ''}`} noValidate>
                    <fieldset className={isLoading ? 'is-loading' : undefined}>
                        <legend>Car Reservation</legend>
                        <div className={`form-group${activeField === 'name' ? ' active' : ''}${errors.name ? ' invalid' : ''}`}>
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
                        <div className={`form-group${activeField === 'email' ? ' active' : ''}${errors.email ? ' invalid' : ''}`}>
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
                        <div className={`form-group${activeField === 'phone' ? ' active' : ''}${errors.phone ? ' invalid' : ''}`}>
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
                        <div className={`form-group${activeField === 'category' ? ' active' : ''}${errors.category ? ' invalid' : ''}`}>
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
                        <div className={`form-group${activeField === 'model' ? ' active' : ''}${errors.model ? ' invalid' : ''}`}>
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
                    {isLoading && <Loader text="Submitting form..." />}
                </form>

                <div className={`form-values${isLoading ? ' is-loading' : ''}`}>
                    {values.name && <p><strong>Name:</strong> {values.name}</p>}
                    {values.email && <p><strong>E-mail:</strong> {values.email}</p>}
                    {values.phone && <p><strong>Phone:</strong> {values.phone}</p>}
                    {values.category && <p><strong>Car Category:</strong> {values.category}</p>}
                    {values.model && <p><strong>Car Model:</strong> {values.model}</p>}
                </div>
            </>
        ) : (
            <Success values={values} backToForm={backToForm} isLoading={isLoading} />
        )
    );
}

export default Form;
