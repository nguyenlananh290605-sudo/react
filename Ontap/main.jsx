import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <TodoApp />
            },
            {
                path: "/users",
                element: <UserPage />
            },
            {
                path: "/books",
                element: <BookPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    //<React.StrictMode>
    // {/*<App /> */ }
    < RouterProvider router={router} />
    //</React.StrictMode>,
)
