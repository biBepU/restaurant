
import './App.css'
import { Outlet } from 'react-router-dom';
import { useLoading } from './hook/useLoading';
import Loading from './components/Loading';
import Header from './components/Header/Header';


import { useEffect } from 'react';
import setLoadingIntersector from './intersector/LoadingIntersector';
import { useAuth } from './hook/useAuth';
import AdminDashboard from './pages/Admin/DashBoard';

function App() {
  const {user} = useAuth();
  const {showLoading,hideLoading} = useLoading();
  useEffect(()=>{
  setLoadingIntersector({showLoading,hideLoading})

  },[])

  return (
    <>
      <Loading/>
      {user && user.role=="admin"?<AdminDashboard/>:<Header/>}
      <Outlet/>
    </>
  )
}

export default App
