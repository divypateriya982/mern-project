import { Routes, Route } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
        </Routes>
    )
}

export default MainRoutes