import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

export default function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Navigate to="/" />} path="*" />
      <Route element={<About />} path="/about" />
      <Route element={<Contact />} path="/contact" />
    </Routes>
  );
}
