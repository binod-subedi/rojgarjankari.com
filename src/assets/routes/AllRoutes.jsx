import { Routes, Route } from 'react-router-dom'
import { Login, Signup, Dashboard } from '../pages/index'
import { ProtectedRoutes } from './ProtectedRoutes'

export const AllRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />} >
                <Route path='/' element={<Dashboard />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
    )
}