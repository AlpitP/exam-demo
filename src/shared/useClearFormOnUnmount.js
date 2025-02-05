import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearForm } from "../redux/slices/formSlice";

const useClearFormOnUnMount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(clearForm());
  }, [dispatch]);
};

export default useClearFormOnUnMount;
