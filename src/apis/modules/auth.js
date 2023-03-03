import Api from "../../apis";
import { authHeader } from "../../helpers/auth-header";

export default {
  register(email, password, fullName) {
    return Api().post("users/signup", {
      email: email,
      password: password,
      name: fullName,
    });
  },
  login(email, password) {
    return Api().post("users/signin", {
      email: email,
      password: password,
    });
  },
  signOut() {
    return Api().post(
      "users/signout",
      { Logout: "logout" },
      {
        headers: { ...authHeader() },
      }
    );
  },
  user(id) {
    return Api().get("users/" + id, {
      headers: authHeader(),
    });
  },
};
