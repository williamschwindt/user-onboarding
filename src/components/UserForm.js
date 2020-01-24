import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';




const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(user => [...user, status]);
    }, [status]);

    return (
        <div>
            <Form>
                <Field name="name" type="text" placeholder="Name" value={values.name}/>
                <Field name="email" type="text" placeholder="Email" value={values.email}/>
                <Field name="password" type="text" placeholder="Password" value={values.password}/>
                <label><Field type="checkbox" name="terms" value={values.terms} /></label>

                <button type="submit">Submit</button>
            </Form>

            {users.map((user, key) => {
                return (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.password}</p>
                        <p>{user.terms}</p>
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
        name: Yup.string().required("This is required"),
        email: Yup.string().required("This is required"),
        password: Yup.string().required("This is required"),
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