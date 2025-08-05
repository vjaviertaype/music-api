export interface JwtStandardPayload {
  iss?: string; // Issuer
  sub?: string; // Subject
  aud?: string; // Audience
  exp?: number; // Expiration time (segundos desde Epoch)
  nbf?: number; // Not before
  iat?: number; // Issued at
  jti?: string; // JWT ID
}
