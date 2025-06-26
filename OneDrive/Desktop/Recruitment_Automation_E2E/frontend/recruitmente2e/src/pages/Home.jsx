import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/current-user')
      .then(res => setUser(res.data))
      .catch(() => navigate('/login'));
  }, []);

  return user ? <h1>Welcome, {user.name}!</h1> : null;
};

export default Home;
