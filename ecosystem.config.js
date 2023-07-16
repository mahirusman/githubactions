module.exports = {
  apps: [
    {
      name: `my-nodejs-app ${process.env.NODE_ENV}`,
      script: "index.js", // Replace 'app.js' with the entry point of your application
      instances: "max", // You can specify the number of instances you want to run
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development", // Environment variables for development
      },
    },
  ],
};
