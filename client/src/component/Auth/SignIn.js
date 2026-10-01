import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn({ setIsLoggedIn }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const form = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/user/signin',
        form
      );

      localStorage.setItem('token', data.token);

      setIsLoggedIn(true);

      navigate('/video');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.response || 'Sign in failed'
        );
      } else {
        setErrorMessage('Something went wrong');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
      />

      <button type="submit">
        Sign In
      </button>

      {errorMessage && (
        <p>{errorMessage}</p>
      )}
    </form>
  );
}