class AuthServices {
  static setToken(token: string) {
    localStorage.setItem("token", token);
  }
  static getToken() {
    return localStorage.getItem("token");
  }
  static clearLoginData() {
    localStorage.removeItem("token");
  }
}
export default AuthServices;
