import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authContext from '../../context/AuthContext';
import * as Yup from 'yup';

const ResetPasswordConfirm = () => {
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });
    let { resetPasswordConfirm } = useContext(authContext);
    const { uid, token } = useParams();

    const resetPasswordConfirmSchema = Yup.object().shape({
        new_password: Yup.string()
            .min(8)
            .matches(
                /^(?=.*[A-Z])(?=.*\d).*$/,
                'Password must contain at least one uppercase letter and one digit'
            )
            .required(),
        re_new_password: Yup.string()
            .oneOf([Yup.ref('new_password')], 'These passwords must match')
            .required(),
    });
    let navigate = useNavigate();
    const { new_password, re_new_password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await resetPasswordConfirmSchema.validate(formData, { abortEarly: false });
        } catch (err) {
            setError(err.errors.join(' and '));
            return;
        }

        resetPasswordConfirm(uid, token, new_password, re_new_password)
            .then(() => {
                navigate('/sign-in');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className='user'>
            <h1> Reset Password Confirmation</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <input
                    className='form-control'
                    type='password'
                    placeholder='New Password'
                    name='new_password'
                    value={new_password}
                    onChange={(e) => onChange(e)}
                    required
                />
                <input
                    className='form-control'
                    type='password'
                    placeholder='Confirm New Password'
                    name='re_new_password'
                    value={re_new_password}
                    onChange={(e) => onChange(e)}
                    required
                />

                <button className='btn btn-primary' type='submit'>
                    Reset Password
                </button>
            </form>
            {error && (
                <div>
                    <p>Error:</p>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordConfirm;
