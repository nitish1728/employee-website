import { useEffect, useState } from "react"

import '../assets/styles/login.css'
import userBackground from '../assets/images/user-background.webp'
import userIcon from '../assets/images/user-icon.png'
import passIcon from '../assets/images/lock-icon.png'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username || !password) {
            setError('Please enter both username and password.')
            setIsSubmitting(false);
            return
        }
        setIsSubmitting(true)
    }
    useEffect(() => { 
        if(!error) return
        const timer = setTimeout(() => {
            setError('')
        }, 3000)
        return () => clearTimeout(timer)
    }, [error])
  return (
    <div className="login-main">
        <div className="main">
            <div className="login-form">
                <h2>Login</h2>
                <img src={userBackground} alt="User Background" />
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <span><img src={userIcon} alt="User Icon" /></span>
                        <input type="text" id="username" name="username"  value={username} onChange={(e)=>setUsername(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <span><img src={passIcon} alt="Password Icon" /></span>
                        <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <button type="submit" disabled={isSubmitting}>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}