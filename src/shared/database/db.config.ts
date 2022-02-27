export const dbconfig = {
  prod: {
    user: 'yllg',
    password: 'yllg',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'MyRestaurant',
    options: {
      encrypt: false,
      enableArithAbort: false,
    },
    requestTimeout: 95000,
    connectionTimeout: 50000,
    port: 1434,
  },
};
