import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(user => [...user, status]);
    }, [status]);


    const termsHandler = (term) => {
        if (term === true) {
            return 'Terms were accepted';
        } else return 'Terms were not accepted';
    };

    return (
        <div>
            <Form>
                <Field name="name" type="text" placeholder="Name" value={values.name}/>
                {touched.name && errors.name && <p>{errors.name}</p>}

                <Field name="email" type="text" placeholder="Email" value={values.email}/>
                {touched.email && errors.email && <p>{errors.email}</p>}

                <Field name="password" type="text" placeholder="Password" value={values.password}/>
                {touched.password && errors.password && <p>{errors.password}</p>}

                <label><Field type="checkbox" name="terms" value={values.terms} /></label>

                <button type="submit">Submit</button>
            </Form>

            {users.map((user, key) => {
                return (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.password}</p>
                        <p>{termsHandler(user.terms)}</p>
                    </div>
                )
            })}
        </div>
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
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
        terms: Yup.bool()
    }),

    handleSubmit(values, {resetForm, setStatus}) {
        console.log("Form Values: ", values);

        axios
            .post("https://reqres.in/api/users", values)

            .then(res => {
                console.log("Posted Data: ", res);
                setStatus(res.data);
                resetForm();
            })
    }
})(UserForm);

export default FormikUserForm;