import { Routes, Route } from 'react-router-dom';
import { Login, Signup, Dashboard, AppliedJobs, Companies, EmployerDashboard, ResetPass, EmployerSignup, VerifyEmailPage, Error404, PostJob } from '../pages/index';
import { ProtectedRoutes } from './ProtectedRoutes';
import { VerifyEmailRoute } from './VerifyEmailRoute';
import { EmployerRoute, UserRoute } from './role-routing';

export const AllRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />} >
                <Route element={<UserRoute />}>
                    <Route path='/' element={<Dashboard />} />
                </Route>
                <Route path='/appliedjobs' element={<AppliedJobs />} />
                <Route path='/companies' element={<Companies />} />
                <Route element={<EmployerRoute />}>
                    <Route path='/employer/dashboard' element={<EmployerDashboard />} />
                    <Route path='/employer/job/post' element={<PostJob />} />
                </Route>
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