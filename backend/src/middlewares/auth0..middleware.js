import { auth } from "express-oauth2-jwt-bearer";

export const verifyAuth0Token = auth({
  audience: "https://pulse-api",
  issuerBaseURL: "https://dev-83i2gu87lkqeektj.us.auth0.com/",
  tokenSigningAlg: "RS256",
});