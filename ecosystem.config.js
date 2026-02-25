module.exports = {
  apps: [
    {
      name: "goharonline",
      cwd: "./backend",
      script: "dist/main.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
