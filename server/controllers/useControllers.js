class UserController {
  async RegisterUser(req, res) {
    res.send("Register User");
  }
  async LoginUser(req, res) {
    res.send("Login User");
  }
  async currentUser(req, res) {
    res.send("Current User");
  }
  async getUserId(req, res) {
    res.send("Get User by ID");
  }
}
