import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import AuthRoute from "./routes/RootRoutes.jsx"
// import AdminRouth from "./routes/AdminRoute.jsx"
import UserRoutes from "./routes/UserRoute"
import AdminRoutes from "./routes/AdminRoute"

const App = () => {
  return (
    <BrowserRouter>
      <UserRoutes />
      <AdminRoutes/>  
    </BrowserRouter>
  )
}

export default App
