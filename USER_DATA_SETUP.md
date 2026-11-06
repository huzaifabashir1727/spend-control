# User-Specific Data Management Setup Guide

## Overview
Your Spend Record app now has complete user-specific data management with Firebase Firestore. Each user's data is isolated and synced in real-time across all devices.

## How It Works

### 1. Authentication Flow
- Users login/signup with email or Google OAuth
- AuthContext manages authentication state
- Only authenticated users can access the app

### 2. Data Management Flow
- DataProvider wraps the app after authentication
- Each user has isolated data in Firestore
- Data automatically loads when user logs in
- Changes sync in real-time

### 3. Data Structure Per User
```
{
  initialValue: number (starting balance)
  balance: number (current balance)
  history: [
    {
      amount: number (positive for add, negative for deduct)
      detail: string (description)
      status: "Add" | "Deduct"
      timestamp: Date
    }
  ]
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Key Features

✅ **User Isolation**: Each user only sees their own data
✅ **Real-time Sync**: Changes appear instantly across all devices
✅ **Automatic Loading**: User data loads on login
✅ **Data Persistence**: All data stored in Firestore
✅ **No Local Storage**: Removed dependency on localStorage

## API Reference

### useData() Hook
Available functions:
```javascript
const {
  initialValue,        // Current initial balance
  balance,            // Current balance
  history,            // Array of spending entries
  loading,            // Loading state
  addSpending,        // async function(amount, detail)
  deductSpending,     // async function(amount, detail)
  setInitialValue,    // async function(value)
  clearAllData        // async function()
} = useData();
```

## Component Usage

### In App.jsx
- Uses `useData()` to get user's data
- Shows loading state while fetching
- Reset button calls `clearAllData()`

### In Input.jsx
- Calls `addSpending()` for Add button
- Calls `deductSpending()` for Deduct button
- Data automatically updates in Firestore

### In initalValue.jsx
- Calls `setInitialValue()` to set starting balance
- Clears history and resets balance

## Firestore Collections Structure

```
Collections:
└── users/
    ├── user1_id/
    │   ├── initialValue: 10000
    │   ├── balance: 8500
    │   ├── history: [...]
    │   ├── createdAt
    │   └── updatedAt
    ├── user2_id/
    │   ├── initialValue: 50000
    │   ├── balance: 45000
    │   ├── history: [...]
    │   ├── createdAt
    │   └── updatedAt
```

## Notes
- Remove redux/localStorage operations - now handled by Firestore
- All data operations are async
- Real-time listeners automatically update UI
- No manual data syncing needed
