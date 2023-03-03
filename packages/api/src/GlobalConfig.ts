export const GlobalConfig = {
    DbUrl: process.env.DATABASE_URL,
    JwtSecret: process.env.JWT_SECRET,
    BCryptSalt: Number(process.env.BCRYPT_SALT),
    DevMode: process.env.NODE_ENV === "development",
};
