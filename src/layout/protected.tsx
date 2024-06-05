import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { RootState } from '../store/store'; // Import your RootState type from your Redux store
import { useState } from 'react';

interface ProtectedProps {
  auth: boolean;
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({auth,  children }) => {  
  const authStatus = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const isAdmin = useAppSelector((state: RootState) => state.auth.isAdmin);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    
      if (authStatus) {
        if (isAdmin !== auth) {
          navigate("/");
        } 
      } else {
        navigate("/");
      }
      setLoader(false);

  }, [authStatus, isAdmin, navigate]);

  

  // Render children only if user is authenticated
  return loader ? null : <>{children}</>
};

export default Protected;
