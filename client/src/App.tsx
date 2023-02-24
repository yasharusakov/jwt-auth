import LoginForm from "./components/LoginForm"
import {useEffect, useState} from "react"
import {useActions} from "./hooks/useActions"
import {useAppSelector} from "./hooks/useAppSelector"
import {IUser} from "./models/IUser"
import UserService from "./services/UserService"

function App() {
    const {isAuth, user, isLoading} = useAppSelector(state => state.user)
    const {checkAuth, logout} = useActions()
    const [users, setUsers] = useState<IUser[]>([])

    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth()
        }
    }, [])

    if (isLoading) return <h1>Loading...</h1>
    if (!isAuth) return <LoginForm/>

    return (
        <div>
            <h1>{isAuth ? `Пользователь авторизован ${user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <h1>{user.isActivated ? `Аккаунт подтвержден по почте` : 'ПОДТВЕРДИТЕ АККАУНТ'}</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={getUsers}>Get users</button>
            {users.map(user => {
                return (
                    <div key={user.id}>
                        <h3>{user.email}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default App
