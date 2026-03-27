const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://qauto2.forstudy.space/",
  },
  env: {
    username: "guest",
    password: "welcome2qauto",
  },
});
