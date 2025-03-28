import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const CLERK_JWKS_URL = "https://polite-walleye-60.clerk.accounts.dev/.well-known/jwks.json"; // Clerk's public keys

const client = jwksClient({
  jwksUri: CLERK_JWKS_URL,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided", success: false });
    return;
  }

  jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err || typeof decoded !== "object") {
      res.status(401).json({ message: "Invalid token", success: false });
      return;
    }

    req.userId = decoded.sub; // Clerk stores the user ID in `sub`
    next();
  });
}
