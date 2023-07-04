import { Link } from 'react-router-dom'
import './UserWidget.component.style.css'
import { useState } from 'react'

export function UserWidget() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const handleLogout = () => {
    alert('Mock - Deslogou')
  }

  return (
    <div className="user-widget-wrapper">
      <div className="widget-header" onClick={() => setIsDropdownOpen(previousValue => !previousValue)}>
        <img src="" alt="user profile" />
        <div className="username">Username-adasdasdasdfdasfdsa</div>
        {isDropdownOpen ? 'ʌ' : 'v'}
      </div>
      {isDropdownOpen &&
        <span className="widget-dropdown">
          <ul>
            <li>
              <Link to="/user-profile">Meu Perfil</Link>
            </li>
            <li>
              <a onClick={() => handleLogout()}>Logout</a>
            </li>
          </ul>
        </span>
      }
    </div>
  )
}