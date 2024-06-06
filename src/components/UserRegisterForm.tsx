import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUpdateUserMutation } from '../services/api'; 

const UpdateUserForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [mutate] = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    
    if (token) {
      setIsLoading(true);
      try {
        console.log(token);
        
        const response = await mutate({ name, email, phoneNumber, password, token });
        console.log('User updated:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Error updating user:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('Token not found in URL');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state onChange
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '3px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state onChange
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '3px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} // Update phoneNumber state onChange
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '3px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state onChange
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '3px' }}
          />
        </div>
        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          {isLoading ? 'Updating...' : 'Update'}
        </button>
        {isError && <div style={{ color: 'red', marginTop: '0.5rem' }}>Error updating user. Please try again.</div>}
      </form>
    </div>
  );
};

export default UpdateUserForm;
