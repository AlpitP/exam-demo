import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { closeToast } from "./redux/slices/toastSlice";

function App() {
  const { open, type, message } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  useEffect(() => {
    open && toast[type](message);
    return () => dispatch(closeToast());
  }, [open, type, message, dispatch]);
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
