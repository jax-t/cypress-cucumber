FROM cypress/base:10
RUN node --version
RUN npm --version
# copy our test application
COPY package.json package-lock.json ./
# copy Cypress tests
COPY cypress.json cypress ./
COPY cypress ./cypress

# avoid many lines of progress bars during install
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# install NPM dependencies and Cypress binary
RUN npm ci
# check if the binary was installed successfully
RUN $(npm bin)/cypress verify