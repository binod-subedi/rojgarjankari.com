import { Link } from "react-router-dom"

export const EmployerDashboard = () => {

  return (
    <div>
      <Link to='/employer/job/post' className="hover:underline">Click here to post a job</Link>
    </div>
  )
}