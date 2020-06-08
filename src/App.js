import React, { useState } from 'react';
import cars from './cars';
import './App.css';

function App() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', category: '', model: '' });
  const [models, setModels] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    
    setValues({
      ...values,
      [name]: value
    });

    if (name === 'category') {
      setModels(value ? cars.find(car => car.category === value).models : []);
    }
  };

  return (
    <div className="app">
      <form className="form">
        <fieldset>
          <legend>Car Reservation</legend>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={values.name}
              className="form-control"
              placeholder="Name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={values.email}
              className="form-control"
              placeholder="E-mail"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              value={values.phone}
              className="form-control"
              placeholder="Phone"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <select
              name="category"
              value={values.category}
              className="form-control"
              required
              onChange={handleChange}
            >
              <option value="">Car Category</option>
              {cars.map(car => <option key={car.id} value={car.category}>{car.category}</option>)}
            </select>
          </div>
          <div className="form-group">
            <select
              name="model"
              value={values.model}
              className="form-control"
              required
              onChange={handleChange}
            >
              <option value="">Car Model</option>
              {models.map(model => <option key={model} value={model}>{model}</option>)}
            </select>
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
    </div>
  );
}

export default App;
