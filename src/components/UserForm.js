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

    const emailValidation = (value) => {
        if(value === 'williammschwindt@gmail.com') {
            return 'Email already taken';
        };
    };

    const handleDelete = (e)  => {
        e.persist();
        const user = users.filter(u => u.name === e.target.name);
        axios
            .delete("https://reqres.in/api/users", user.values)

            .then((res) => {
                console.log(res);
                const name = e.target.name;
                setUsers(users.filter(user => user.name !== name));
            })
            .catch((err) => {
                console.log(err);
            })
    }



    return (
        <div>
            <h1>Add a new user</h1>
            <Form>
                <Field name="name" type="text" placeholder="Name" value={values.name}/>
                {touched.name && errors.name && <p>{errors.name}</p>}

                <Field name="email" type="text" placeholder="Email" value={values.email} validate={emailValidation}/>
                {touched.email && errors.email && <p>{errors.email}</p>}

                <Field name="password" type="text" placeholder="Password" value={values.password}/>
                {touched.password && errors.password && <p>{errors.password}</p>}

                <label>Accpet Terms of Survice<Field className="checkbox" type="checkbox" name="terms" value={values.terms} /></label>

                <button type="submit">Submit</button>
            </Form>

            <div className="users">
                {users.map((user) => {
                    return (
                        <div className="user" key={user.id}>
                            <button name={user.name} onClick={handleDelete} className="user-buton">X</button>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <p>{user.password}</p>
                            <p>{termsHandler(user.terms)}</p>
                        </div>
                    )
                })}
            </div>
                
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
        email: Yup.string().required("Email is required").email("Invalid email"),
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
    },

})(UserForm);

export default FormikUserForm;