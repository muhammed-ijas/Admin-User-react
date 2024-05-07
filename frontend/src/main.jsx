import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import store from './store.js';
import { Provider } from 'react-redux'
import PrivateRoute from './components/PrivateRouter.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './Admin.jsx';
import AdminHero from './components/hero/AdminHero.jsx';
import AdminRegister from './pages/AdminRegister.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import Addusers from './pages/Addusers.jsx';
import EditUsers from './pages/EditUsers.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Route>
      <Route path='/admin' element={<Admin />}>
        <Route path="login" index element={<AdminLogin />}></Route>
        <Route path="register" index element={<AdminRegister />}></Route>
        <Route path='' element={<AdminPrivateRoute />}>
          <Route index={true} path='' element={<AdminHero />} />
          <Route path='addUser' element={<Addusers />} />
          <Route path='editUser/:userId' element={<EditUsers />} />
        </Route>
      </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
