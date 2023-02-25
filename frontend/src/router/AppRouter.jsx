import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Car from "../pages/Car";
import Spare from "../pages/Spare";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="yedekparca" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="car" element={<Car />} />

            <Route path="spare" element={<Spare />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
