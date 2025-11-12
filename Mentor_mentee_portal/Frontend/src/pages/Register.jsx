import React, { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'mentee',
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  const validate = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    } else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      nextErrors.password = 'Password needs 1 uppercase letter and 1 number.'
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus(null)
      return
    }

    setErrors({})
    setStatus('Registration successful! (Mock submission)')
    // TODO: Replace with API call
  }

  return (
    <section className="page">
      <h1>Register</h1>
      <p>Create your account to start learning, mentoring, and collaborating with the community.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form__group">
          <div className="form__field">
            <label htmlFor="register-fullName">Full Name</label>
            <input
              id="register-fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
            {errors.fullName && <span className="form__error">{errors.fullName}</span>}
          </div>

          <div className="form__field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <span className="form__error">{errors.email}</span>}
          </div>
        </div>

        <div className="form__group">
          <div className="form__field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
            {errors.password && <span className="form__error">{errors.password}</span>}
          </div>

          <div className="form__field">
            <label htmlFor="register-confirmPassword">Confirm Password</label>
            <input
              id="register-confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className="form__error">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className="form__field">
          <label htmlFor="register-role">Role</label>
          <select
            id="register-role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <button type="submit" className="form__submit">
          Create Account
        </button>
        {status && <p className="form__status">{status}</p>}
      </form>
    </section>
  )
}

export default Register
