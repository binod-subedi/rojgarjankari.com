import { Link } from "react-router-dom"
import { Navbar, Footer } from '../components'

export const EmployerDashboard = () => {

  return (
    <div>
      <Navbar />
      <Link to='/employer/job/post' className="hover:underline">Click here to post a job</Link>
      <Footer />
    </div>
  )
}