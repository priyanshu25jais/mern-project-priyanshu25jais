import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/courses">Courses</NavLink>
      <NavLink to="/resources">Resources</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  )
}

export default Navbar

