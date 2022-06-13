module.exports = {
  apps: [{
    name: 'INSTA-API',
    script: 'index.js',
    log_date_format: "YYYY-MM-DD HH:mm Z",
    args: 'one two',
    instances: 1,
    autorestart: true,
    ignore_watch: ["node_modules", "assets"],
    max_memory_restart: '1G',
    env_test: {
      NODE_ENV: 'test'
    },
    node_args: ["--inspect"]
  }]
};
