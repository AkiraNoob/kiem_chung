const jestConfigEnv = {
  PORT: '8000',
  MONGODB_CONNECT_STRING:
    'mongodb+srv://21521307_UIT:<password>@myfirstcluster.9ham1ww.mongodb.net/kiem_chung?retryWrites:true&w:majority',
  MONGODB_PASSWORD: 'Admin123',
  SECRET_KEY: 'Adm1nS3c43tK3Y',
  JWT_EXPIRED: '300',
  REFRESH_SECRET_KEY: 'ReAdm1nfreS3c43tK3Ysh',
  REFRESH_JWT_EXPIRED: '604800',
  SPOTIFY_CLIENT_ID: '47f3995362ad43ab997bc64b097f840e',
  SPOTIFY_CLIENT_SECRET: '9d2940eefa814d87a3cfb0176b6509fd',
};
export { jestConfigEnv };
