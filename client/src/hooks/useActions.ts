import {useAppDispatch} from "./useAppDispatch"
import {bindActionCreators} from "redux"
import * as UserCreators from '../store/userSlice'

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(
        {...UserCreators},
        dispatch
    )
}