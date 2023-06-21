import { Navigate } from "react-router-dom";

// Этот компонент принимает другой компонент в качестве пропса.
// Он также может взять неограниченное число пропсов и передать их новому компоненту.
// Деструктуризация пропсов, достаём по ключу element, и записываем в переменную Component.
// Теперь в props нет ключа element
const ProtectedRoute = ({ element: Component, ...props  }) => {
  return (
    // Если авторизованы, то переход в Component, передав в props компонента props
    // Если нет, то происходит редирект на Login
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRoute;
