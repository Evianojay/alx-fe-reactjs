import { useState, useEffect } from 'react';

// Simulated authentication hook
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching auth status from localStorage or API
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ name: 'John Doe' }); // example user object
    }
  }, []);

  return { user };
};

export default useAuth;
