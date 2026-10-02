import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:9000",
    specPattern: "cypress/**/*.cy.{js,mjs,jsx,ts,tsx}",
    supportFile: false,
  },
});
