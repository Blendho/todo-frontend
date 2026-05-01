import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = 'https://todo-api-yxa6.onrender.com'

function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    function handleRegister(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    fetch(`${API}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Response from backend:', data)
            if (data.error || data.errors) {
                const message = data.error || data.errors[0].msg
                setError(message)
                setLoading(false)
            } else {
                navigate('/login')
            }
        })
        .catch((error) => {
            console.log('Error:', error)
            setLoading(false)
        })
}

    return (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#4F46E5' }}>Register</h1>

            {error && <p style={{
                color: 'red',
                backgroundColor: '#fee2e2',
                padding: '10px',
                borderRadius: '6px',
                marginBottom: '16px',
                fontSize: '14px'
            }}>{error}</p>}

            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '14px' }}>Password</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '10px 14px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                padding: '10px 14px',
                                backgroundColor: '#f3f4f6',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '14px'
                            }}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: loading ? '#a5b4fc' : '#4F46E5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                Already have an account?{' '}
                <span
                    onClick={() => navigate('/login')}
                    style={{ color: '#4F46E5', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Login here
                </span>
            </p>
        </div>
    </div>
)
}

export default RegisterPage