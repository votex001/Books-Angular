import { authService } from "../apis/auth/auth.service.js";


export function requireAuth(req, res, next) {
  const loggedinUser = authService.validateToken(req.cookies.loginToken);
  if (!loggedinUser || !loggedinUser.id) {
    return res.status(401).send("Login first");
  }

  req.loggedinUser = loggedinUser;
  next();
}
