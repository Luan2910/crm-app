import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import React, { useCallback, useContext, useState } from 'react'

import Home from './Home'
import Products from './products/pages/Products'
import Users from './user/pages/Users'
import Auth from './auth/pages/Auth'
import { AuthContext } from './share/context/AuthContext'
import Nav from './share/components/navigation/Nav'
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './Layout'
import Dashboard from './dashboard/pages/Dashboard'


function App() {

  const auth = useContext(AuthContext)

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000)); // fake delay
    setIsLoggedIn(true);
  }, [])

  const logout = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 1000)); // fake delay
    setIsLoggedIn(false);
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={<Home />}/>
              <Route element={<Layout />}>
                <Route path='auth' element={<Auth/>}/>
                <Route element={<ProtectedRoute/>}>
                  <Route path='products' element={<Products />}/>
                  <Route path='dashboard' element={<Dashboard />}/>
                  <Route path='users' element={<Users />}/>
                </Route>
              </Route>
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
