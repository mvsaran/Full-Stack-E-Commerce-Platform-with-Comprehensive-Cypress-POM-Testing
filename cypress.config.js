const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: true,
        screenshotOnRunFailure: true,
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,spec.js}',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
})
