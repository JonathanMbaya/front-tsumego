import React, { useEffect, useState } from 'react'
import UserForm from '../../../components/UserForm/UserForm'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../../services/session/session'

const SignupView = () => {
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    if(user)
      navigate("/")
  }, [])
  
  return (
    <div className='container'>
      <UserForm/>
    </div>
  )
}

export default SignupView