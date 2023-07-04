import './Header.component.style.css'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="app-header">
      <h1>
        <Link to="/home">
          RecoVale
        </Link>
      </h1>
    </header>
  )
}