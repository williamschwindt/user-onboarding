import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';




const UserForm = ({ errors, touched, values, status }) => {
    return (
            <Form>
                <Field name="name" type="text" placeholder="Name" value={values.name}/>
                <Field name="email" type="text" placeholder="Email" value={values.email}/>
                <Field name="password" type="text" placeholder="Password" value={values.password}/>
                <label><Field type="checkbox" name="terms" value={values.terms} /></label>

                <button type="submit">Submit</button>
            </Form>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues() {
        return {
            name: "",
            email: "",
            password: "",
            terms: false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("This is required"),
        email: Yup.string().required("This is required"),
        password: Yup.string().required("This is required"),
        terms: Yup.bool()
    }),

    handleSubmit(values) {
        console.log(values);
    }
})(UserForm);

export default FormikUserForm;