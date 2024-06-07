import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
