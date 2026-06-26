import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [initialValue, setInitialValue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize user data in Firestore
  const initializeUserData = useCallback(async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create user data document if it doesn't exist
        await setDoc(userDocRef, {
          initialValue: 0,
          balance: 0,
          history: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error initializing user data:', error);
    }
  }, []);

  // Fetch user data from Firestore in real-time
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Initialize user data first
    initializeUserData(currentUser.uid);

    // Set up real-time listener
    const userDocRef = doc(db, 'users', currentUser.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setInitialValue(data.initialValue || 0);
        setBalance(data.balance || 0);
        setHistory(data.history || []);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, initializeUserData]);

  // Add spending entry
  const addSpending = useCallback(
    async (amount, detail) => {
      if (!currentUser) return;

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const newEntry = {
          amount: Number(amount),
          detail,
          status: 'Add',
          timestamp: new Date(),
        };

        const newBalance = balance + Number(amount);

        await updateDoc(userDocRef, {
          balance: newBalance,
          history: [...history, newEntry],
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error('Error adding spending:', error);
      }
    },
    [currentUser, balance, history]
  );

  // Deduct spending entry
  const deductSpending = useCallback(
    async (amount, detail) => {
      if (!currentUser) return;

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const newEntry = {
          amount: -Number(amount),
          detail,
          status: 'Deduct',
          timestamp: new Date(),
        };

        const newBalance = balance - Number(amount);

        await updateDoc(userDocRef, {
          balance: newBalance,
          history: [...history, newEntry],
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error('Error deducting spending:', error);
      }
    },
    [currentUser, balance, history]
  );

  // Set initial value
  const setUserInitialValue = useCallback(
    async (value) => {
      if (!currentUser) return;

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const newBalance = Number(value);

        await updateDoc(userDocRef, {
          initialValue: Number(value),
          balance: newBalance,
          history: [],
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error('Error setting initial value:', error);
      }
    },
    [currentUser]
  );

  // Clear all data for user
  const clearAllData = useCallback(async () => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);

      await updateDoc(userDocRef, {
        initialValue: 0,
        balance: 0,
        history: [],
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }, [currentUser]);

  return (
    <DataContext.Provider
      value={{
        initialValue,
        setInitialValue: setUserInitialValue,
        balance,
        setBalance,
        history,
        setHistory,
        loading,
        addSpending,
        deductSpending,
        clearAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
