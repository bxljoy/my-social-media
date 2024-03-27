import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const signin = (formData, navigate, setError) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
    setError("Invalid credentials. Please try again.");
  }
};

export const signup = (formData, navigate, setError) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
    setError("Invalid credentials. Please try again.");
  }
};
