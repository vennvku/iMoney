import Api from "../../apis";

export default {
  login(email, password) {
    console.log({ email, password });
    return Api().post("users/signin", {
      email: email,
      password: password,
    });
  },
  register(email, password, fullName) {
    console.log(email, password, fullName);
    return Api().post("users/signup", {
      email: email,
      password: password,
      name: fullName,
    });
  },
};
