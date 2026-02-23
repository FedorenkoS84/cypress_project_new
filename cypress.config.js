const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
  },
  env: {
    username: "guest",
    password: "welcome2qauto",
  },
});
