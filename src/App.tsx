import React, { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router'
import { useAtomValue } from 'jotai'

import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/protectedRoute'
import { userAtom } from './atoms/user'
import LoginPage from './app/login/page'
import RegisterPage from './app/register/page'

const App = () => {
  const { logout, checkAuth } = useAuth();
  const hasCheckedAuth = useRef(false);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (hasCheckedAuth.current) return;
    checkAuth();
    hasCheckedAuth.current = true;
  }, []);

  return <>
    <Routes>
      <Route path='/' index element={<div>LandingPage</div>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<RegisterPage />} />
      <Route path='/home' element={
        <ProtectedRoute>
          <div>
            <h2>HomePage</h2>
            <p>Welcome, {user?.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  </>
}

export default App