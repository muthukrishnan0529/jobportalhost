import API from "./axios";

export const loginUser = (data) => {
    return API.post("users/login/", data);
};

