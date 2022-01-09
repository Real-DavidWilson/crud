import "dotenv/config";

const checkEnv = (envname: string, exit = false) => {
    if (process.env[envname] == undefined) {
        !exit && process.env.NODE_ENV !== "production" && console.log(`Variável de ambiente opcional não definida: '${envname}'`);
        if(exit){
            console.log(`Variável de ambiente obrigatória não definida: '${envname}'`);
            process.exit(1);
        }
    }
};

export default checkEnv;
