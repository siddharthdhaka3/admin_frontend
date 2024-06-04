import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { RootState } from '../store/store'; // Import your RootState type from your Redux store

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  console.log("protected compran");
  
  const authStatus = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const isAdmin = useAppSelector((state: RootState) => state.auth.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      if (authStatus) {
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        navigate("/");
      }
    };

    handleNavigation();
  }, [authStatus, isAdmin, navigate]);

  if (!authStatus) {
    return null; // Redirecting to login page, so no need to render anything
  }

  // Render children only if user is authenticated
  return <>{children}</>;
};

export default Protected;
