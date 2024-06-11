import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../redux/actions/apiAction";
import CustomButton from "../shared/Button";
import Form from "../shared/Form";
import { resetPasswordFormFields } from "../utils/resetPasswordFormFields";
import { validation } from "../utils/validation";
import Sidebar from "./Sidebar";
import { clearForm } from "../redux/slices/formSlice";

const ResetPassword = () => {
  const { formData } = useSelector((state) => state.formData);
  const { loading } = useSelector((state) => state.api);

  const dispatch = useDispatch();

  const resetPasswordHandler = async () => {
    const valid = validation(resetPasswordFormFields);
    if (valid) {
      const config = {
        url: `users/ResetPassword`,
        method: "post",
        data: formData,
      };
      await dispatch(api({ name: "resetPassword", config }));
      dispatch(clearForm());
    } else {
      toast.error("Please Enter valid data.");
    }
  };

  return (
    <div>
      <Sidebar />
      <h1>Reset Password</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <Form formFields={resetPasswordFormFields} />
        <CustomButton
          text={loading.resetPassword ? "Loading" : "Submit"}
          onClick={resetPasswordHandler}
        />
      </form>
    </div>
  );
};

export default ResetPassword;