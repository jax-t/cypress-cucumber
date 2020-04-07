FROM cypress/browsers:node12.13.0-chrome80-ff74
RUN node --version
RUN npm --version
RUN npm install -g multiple-cucumber-html-reporter

# copy our test application
COPY package.json package-lock.json ./
# copy Cypress tests
COPY cypress.json cypress ./
COPY cypress ./cypress
COPY webpack.config.js ./
COPY cucumber-html-generator2.js ./

# avoid many lines of progress bars during install
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# install NPM dependencies and Cypress binary
RUN npm ci
# check if the binary was installed successfully
RUN $(npm bin)/cypress verify