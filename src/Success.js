import React from 'react';
import Loader from './Loader';

function Success({ values, backToForm, isLoading }) {
    return (
        <div className="success">
            <div className={isLoading ? 'is-loading' : undefined}>
                <h2>Form submitted successfully</h2>
                <p><strong>Name:</strong> <br/> {values.name}</p>
                <p><strong>E-mail:</strong> <br/> {values.email}</p>
                {values.phone && <p><strong>Phone:</strong> <br/> {values.phone}</p>}
                <p><strong>Car Category:</strong> <br/> {values.category}</p>
                <p><strong>Car Model:</strong> <br/> {values.model}</p>
                <button onClick={backToForm}>Back to reservation form</button>
            </div>
            {isLoading && <Loader text="Loading form..." />}
        </div>
    );
}

export default Success;
