export const options = {
  mysql: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      database: "ecommerce",
    },
    pool: { min: 0, max: 10 },
  },
  sqlite: {
    client: "sqlite3",
    connection: {
      filename: "./ecommerce.sqlite",
    },
    useNullAsDefault: true,
  },
};
