import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestCourses from './LatestCourses'
import Footer from './shared/Footer'
import useGetAllCourses from '@/hooks/useGetAllCourses'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllCourses();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/languages"); // Changed from /admin/companies to /admin/languages
    }
  }, [user, navigate]);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestCourses />
      <Footer />
    </div>
  )
}

export default Home
