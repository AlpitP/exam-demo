import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearForm } from "../redux/slices/formSlice";

const useClearFormOnUnMound = () => {
  const dispatch = useDispatch();
  return useEffect(() => {
    return () => dispatch(clearForm());
  }, [dispatch]);
};

export default useClearFormOnUnMound;
