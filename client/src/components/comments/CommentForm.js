import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class CommentForm extends Component {
    renderError({ error, touched }) {
        if (touched && error)
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
    }

    renderInput = ({ input, label, meta }) => {
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
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="comment" component={this.renderInput} />
                <button className="ui button primary">Post Comment</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.comment)
        errors.comment = 'You must enter a comment'
    return errors;
}

export default reduxForm({
    form: 'commentForm',
    validate: validate,
    enableReinitialize: true
})(CommentForm);