import {useState} from "react"
import {useActions} from "../hooks/useActions"

const LoginForm = () => {
    const {login, registration} = useActions()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <div>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <button onClick={() => login({email, password})}>Login</button>
            <button onClick={() => registration({email, password})}>Register</button>
        </div>
    )
}

export default LoginForm