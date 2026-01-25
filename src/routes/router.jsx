// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home/Home";
import Login from "../pages/authPages/Login/Login";
import RegisterEmployee from "../pages/authPages/Register/RegisterEmployee";
import RegisterHR from "../pages/authPages/Register/RegisterHR";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome/DashboardHome";
import AddAsset from "../pages/dashboard/AddAsset/AddAsset";
import AssetList from "../pages/dashboard/AssetList/AssetList";
import UpgradePackage from "../pages/dashboard/UpgradePackage/UpgradePackage";
import AllRequests from "../pages/dashboard/AllRequests/AllRequests";
import AllEmployees from "../pages/dashboard/AllEmployees/AllEmployees";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import RequestAnAsset from "../pages/dashboard/RequestAnAsset/RequestAnAsset";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyProfile from "../pages/dashboard/MyProfile/MyProfile";
import PaymentSucess from "../pages/dashboard/PaymentSucess/PaymentSucess";
import PaymentCancelled from "../pages/dashboard/PaymentCancelled/PaymentCancelled";
import MyAssets from "../pages/dashboard/MyAssets/MyAssets";
import MyTeam from "../pages/dashboard/MyTeam/MyTeam";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register-employee",
        element: <RegisterEmployee />,
      },
      {
        path: "register-hr",
        element: <RegisterHR />,
      },
      {
        path: "payment-success",
        element: <PaymentSucess />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />

      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "add-asset",
        element: <HrRoute><AddAsset /></HrRoute>,
      },
      {
        path: "asset-list",
        element: <HrRoute><AssetList /></HrRoute>,
      },
      {
        path: "all-requests",
        element: <HrRoute><AllRequests /></HrRoute>,
      },
      {
        path: "my-employees",
        element: <HrRoute><AllEmployees /></HrRoute>,
      },
      {
        path: "upgrade-package-hr",
        element: <HrRoute><UpgradePackage /></HrRoute>,
      },
      {
        path: "my-assets",
        element: <EmployeeRoute><MyAssets /></EmployeeRoute>,
      },
      {
        path: "request-asset",
        element: <EmployeeRoute><RequestAnAsset /></EmployeeRoute>,
      },
      {
        path: "my-team",
        element: <EmployeeRoute><MyTeam /></EmployeeRoute>,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },

      {
        path: "payment-success",
        element: <PaymentSucess />,
      },
    ],
  },
]);