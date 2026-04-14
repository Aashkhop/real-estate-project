import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(email, password);
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{
      display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f1f5f9'
    }}>
      <div style={{
        background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px'
      }}>
        <h2 style={{marginBottom: '20px', textAlign: 'center'}}>Admin Login</h2>
        {error && <div style={{color: 'red', marginBottom: '15px', textAlign: 'center'}}>{error}</div>}
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '5px'}}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '5px'}}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
            />
          </div>
          <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
