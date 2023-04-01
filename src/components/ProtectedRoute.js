import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
    // console.log(props.isLoggedIn);
    return (
        props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
    )
}

export default ProtectedRoute;