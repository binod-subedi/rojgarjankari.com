import { Routes, Route } from 'react-router-dom'
import { Login, Signup, Dashboard, AppliedJobs, Companies, EmployerDashboard } from '../pages/index'
import { ProtectedRoutes } from './ProtectedRoutes'

export const AllRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />} >
                <Route path='/' element={<Dashboard />} />
                <Route path='/appliedjobs' element={<AppliedJobs />} />
                <Route path='/companies' element={<Companies />} />
                <Route path='/employerdashboard' element={<EmployerDashboard />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
    )
}