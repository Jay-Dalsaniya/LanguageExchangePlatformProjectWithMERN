import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Courses from './components/Courses';  // Renamed from Jobs
import Browse from './components/Browse';
import Profile from './components/Profile';
import CourseDescription from './components/CourseDescription';  // Renamed from JobDescription
import Languages from './components/admin/Languages';  // Renamed from Companies
import LanguageCreate from './components/admin/LanguageCreate';  // Renamed from CompanyCreate
import LanguageSetup from './components/admin/LanguageSetup';  // Renamed from CompanySetup
import AdminCourses from "./components/admin/AdminCourses";  // Renamed from AdminJobs
import PostCourse from './components/admin/PostCourse';  // Renamed from PostJob
import Learners from './components/admin/Learners';  // Renamed from Applicants
import ProtectedRoute from './components/admin/ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/courses",  // Renamed from /jobs
    element: <Courses />
  },
  {
    path: "/description/:id",
    element: <CourseDescription />  // Renamed from JobDescription
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // Admin routes start here
  {
    path: "/admin/languages",  // Renamed from /admin/companies
    element: <ProtectedRoute><Languages /></ProtectedRoute>
  },
  {
    path: "/admin/languages/create",  // Renamed from /admin/companies/create
    element: <ProtectedRoute><LanguageCreate /></ProtectedRoute> 
  },
  {
    path: "/admin/languages/:id",  // Renamed from /admin/companies/:id
    element: <ProtectedRoute><LanguageSetup /></ProtectedRoute> 
  },
  {
    path: "/admin/courses",  // Renamed from /admin/jobs
    element: <ProtectedRoute><AdminCourses /></ProtectedRoute> 
  },
  {
    path: "/admin/courses/create",  // Renamed from /admin/jobs/create
    element: <ProtectedRoute><PostCourse /></ProtectedRoute> 
  },
  {
    path: "/admin/courses/:id/learners",  // Renamed from /admin/jobs/:id/applicants
    element: <ProtectedRoute><Learners /></ProtectedRoute> 
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
