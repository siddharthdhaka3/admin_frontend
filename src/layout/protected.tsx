import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const authStatus = useSelector((state: any) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(true);
    console.log(
        "ccc"
    );
    
  useEffect(() => {
    const handleNavigation = () => {
        console.log("executed");
        
      if (authStatus) {
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        navigate("/");
      }
      setLoader(false);
    };

    handleNavigation();
  }, [authStatus, isAdmin, navigate]);

  return loader ? null : <>{children}</>;
};

export default Protected;
