import Axios from "axios";

export const getData = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_LIST_PENDING" });
    return Axios.get("http://localhost:3000/detail")
      .then((response) => {
        dispatch({
          type: "FETCH_LIST_SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const submitData = (payload) => {
  
  return Axios.post("http://localhost:3000/detail", payload).then((res) =>
    console.log(res)
  );
};
