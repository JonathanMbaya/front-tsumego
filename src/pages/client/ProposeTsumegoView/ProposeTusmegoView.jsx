import React, { useEffect } from 'react'
import { getUser } from '../../../services/session/session'
import { useLocation, useNavigate } from 'react-router-dom'
import TsumegoForm from '../../../components/TsumegoForm/TsumegoForm'

const ProposeTusmegoView = () => {
  const user = getUser()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate("/login", {state: {from: location.pathname}})
    }
  }, [])
  
  return (
    <div className='container'>
      <TsumegoForm/>
    </div>
  )
}

export default ProposeTusmegoView