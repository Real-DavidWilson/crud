import checkEnv from "../utils/checkEnv";

console.log(process.env.NODE_ENV)

checkEnv("PORT");
checkEnv("BCRYPT_ROUNDS");
checkEnv("JWT_SECRET", true);
checkEnv("DATABASE_URI", true);

const config = {
    app: {
        port: parseInt(process.env.PORT) || 3000,
        bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
        jwtSecret: process.env.JWT_SECRET,
    },
    database: {
        uri: process.env.DATABASE_URI,
    },
};

export default config;
