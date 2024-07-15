import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => {
    return {
        secret: process.env.JWT_TOKEN,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        accessTokenTtl: +process.env.JWT_ACCESS_TOKEN_TTL || 3600,
        refreshTokenTtl: +process.env.JWT_REFRESH_TOKEN_TTL || 86400,
    };
});