import { Routes, Route } from 'react-router-dom'
import { Login, Signup, Dashboard, AppliedJobs, Companies, EmployerDashboard, ResetPass, EmployerSignup, VerifyEmailPage, Error404 } from '../pages/index'
import { ProtectedRoutes } from './ProtectedRoutes'
import { VerifyEmailRoute } from './VerifyEmailRoute'

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
            <Route path='/resetpassword' element={<ResetPass />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/employersignup' element={<EmployerSignup />} />
            <Route element={<VerifyEmailRoute />}>
                <Route path="/verifyemail" element={<VerifyEmailPage />} />
            </Route>
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}