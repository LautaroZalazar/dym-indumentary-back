import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      appName: process.env.APP_NAME,
      app_port: process.env.APP_PORT,
      api_key: process.env.APP_API_KEY,
      app_global_prefix: process.env.APP_GLOBAL_PREFIX,
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
      domain: process.env.APP_DOMAIN,
      env: process.env.NODE_ENV,
      app_db: process.env.APP_DB,
    },
    mongo: {
      mongo_uri: process.env.MONGO_URI,
    },
    providerPayment: {
      mercadoPago: {
        publicKey: process.env.MP_PUBLIC_KEY,
        accessToken: process.env.MP_ACCESS_TOKEN,
      },
    },
    providerEmail: {
      resend: {
        apyKey: process.env.RESEND_API_KEY,
      },
    },
    enterpriseData: {
      email: process.env.ENTERPRISE_EMAIL,
    },
  };
});
