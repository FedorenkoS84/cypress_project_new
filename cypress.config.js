const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    setupNodeEvents(on, config) {},
  },

  env: {
    username: "guest",
    password: "welcome2qauto",
  },
});
