const jestConfigEnv = {
  PORT: '8000',
  MONGODB_CONNECT_STRING:
    'mongodb+srv://21521307_UIT:<password>@myfirstcluster.9ham1ww.mongodb.net/kiem_chung?retryWrites:true&w:majority',
  MONGODB_PASSWORD: 'Admin123',
  SECRET_KEY: 'Adm1nS3c43tK3Y',
  JWT_EXPIRED: '300',
  REFRESH_SECRET_KEY: 'ReAdm1nfreS3c43tK3Ysh',
  REFRESH_JWT_EXPIRED: '604800',
};
export { jestConfigEnv };
