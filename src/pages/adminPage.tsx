import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../store/store";
import { RootState } from '../store/store';
import { addUser } from '../store/userSlice'; // Assuming addUser action is defined in userSlice
import axios from "axios";

interface User {
  id: string;
  email: string; // Switched from phoneNumber to email
}
const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Fetch users from Redux store
  const allUsers = useAppSelector((state: RootState) => state.user.users);
  useEffect(() => {
    // Fetch users from backend
    axios.get<User[]>('http://localhost:4000/api/user/all')
      .then(response => {
        // Dispatch action to add fetched users to the Redux store
        response.data.forEach(user => {
          dispatch(addUser(user));
        });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [dispatch]);
  
  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <h3>All Users:</h3>
        <ul>
          {allUsers.map((user: User) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
