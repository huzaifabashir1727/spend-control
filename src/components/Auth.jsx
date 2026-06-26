import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { DataProvider } from '../context/DataContext';
import Login from './Login';
import Signup from './Signup';

export default function Auth({ children }) {
  const { currentUser, loading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return isLoginMode ? (
      <Login onSwitchToSignup={() => setIsLoginMode(false)} />
    ) : (
      <Signup onSwitchToLogin={() => setIsLoginMode(true)} />
    );
  }

  return (
    <DataProvider>
      <div>
        <div className="logout-header">
          <div className="user-info">
            <span className="user-name">
              {currentUser.displayName || currentUser.email}
            </span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
        {children}
      </div>
    </DataProvider>
  );
}
