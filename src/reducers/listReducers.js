export const listReducer = (
  s = {
    loading: true,
    data: null,
  },
  action
) => {
  switch (action.type) {
    case "FETCH_LIST_PENDING":
      return {
        ...s,
        data: null,
        loading: true,
      };
    case "FETCH_LIST_SUCCESS":
      return {
        ...s,
        data: action?.payload,
        loading: false,
      };
    default:
      return s;
  }
};

export const diariJajanReducer = (
  s = {
    loading: true,
    data: null,
  },
  action
) => {
  switch (action.type) {
    case "FETCH_LIST_ITEM_PENDING":
      return {
        ...s,
        data: null,
        loading: true,
      };
    case "FETCH_LIST_ITEM_SUCCESS":
      return {
        ...s,
        data: action?.payload,
        loading: false,
      };
    default:
      return s;
  }
};
