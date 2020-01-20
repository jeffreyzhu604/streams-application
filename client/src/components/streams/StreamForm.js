import React from 'react';
import { Field, reduxForm } from 'redux-form'; // Field is an input component
                                               // reduxForm works like connect

class StreamForm extends React.Component {
    renderError({ error, touched}) {
        if (touched && error)
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
    }
    
    renderInput = ({ input, label, meta }) => {
        console.log(input);
        console.log(meta); 
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.onSubmit(formValues);
    }

    render() {
        console.log(this.props); // redux-form properties     
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter title" />
                <Field name="description" component={this.renderInput} label="Enter description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }   
}

/*
    Synchronous client-side validation to the form:
    - Provide redux-form with a validation function that takes an object of form values
    and returns an object of errors. This is done by providing the validation function to
    the decorator as a config parameter, or to the docrated form component as a prop.
*/
const validate = (formValues) => {
    console.log(formValues);
    const errors = {};

    if (!formValues.title) {
        // if no title        
        errors.title = 'You must enter a title'
    }
    if (!formValues.description) {
        // if no title        
        errors.description = 'You must enter a description'
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
