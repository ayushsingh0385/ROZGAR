import Login from "./auth/Login";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import { Toaster } from "./components/ui/sonner";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HereSection from "./components/HereSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import WorkersDetail from "./components/WorkersDetail";
import Cart from "./components/Cart";
import Workers from "./admin/Workers";
import AddWorkers from "./admin/AddWorkers";
// import Success from "./components/Success";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { useThemeStore } from "./store/useThemeStore";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  return isAuthenticated && user?.isVerified ? <Navigate to="/" replace /> : children;
};

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: "/", element: <HereSection /> },
      { path: "/profile", element: <Profile /> },
      { path: "/search/:text", element: <SearchPage /> },
      { path: "/Workers/:id", element: <WorkersDetail /> },
      { path: "/cart", element: <Cart /> },
      // { path: "/order/status", element: <Success /> },
      { path: "/admin/Workers", element: <AdminRoute><Workers /></AdminRoute> },
      { path: "/admin/menu", element: <AdminRoute><AddWorkers /></AdminRoute> },
    ],
  },
  { path: "/login", element: <AuthenticatedUser><Login /></AuthenticatedUser> },
  { path: "/signup", element: <AuthenticatedUser><Signup /></AuthenticatedUser> },
  { path: "/forgot-password", element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/verify-email", element: <VerifyEmail /> },
]);

function App() {
  const initializeTheme = useThemeStore(state => state.initializeTheme);
  const { checkAuthentication, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;

  return (
    <main>
      <Toaster position="top-right" richColors />
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;