import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <section className="page">
      <h1>Welcome to the Mentor Mentee Portal</h1>
      <p>Discover resources, courses, and connect with mentors to accelerate your growth.</p>
      <Outlet />
    </section>
  )
}

export default Home
