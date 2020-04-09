// Example Jenkins pipeline with Cypress end-to-end tests running in parallel on 2 workers
// Pipeline syntax from https://jenkins.io/doc/book/pipeline/

// Setup:
//  before starting Jenkins, I have created several volumes to cache
//  Jenkins configuration, NPM modules and Cypress binary

// docker volume create jenkins-data
// docker volume create npm-cache
// docker volume create cypress-cache

// Start Jenkins command line by line:
//  - run as "root" user (insecure, contact your admin to configure user and groups!)
//  - run Docker in disconnected mode
//  - name running container "blue-ocean"
//  - map port 8080 with Jenkins UI
//  - map volumes for Jenkins data, NPM and Cypress caches
//  - pass Docker socket which allows Jenkins to start worker containers
//  - download and execute the latest BlueOcean Docker image

// docker run \
//   -u root \
//   -d \
//   --name blue-ocean \
//   -p 8080:8080 \
//   -v jenkins-data:/var/jenkins_home \
//   -v npm-cache:/root/.npm \
//   -v cypress-cache:/root/.cache \
//   -v /var/run/docker.sock:/var/run/docker.sock \
//   jenkinsci/blueocean:latest

// If you start for the very first time, inspect the logs from the running container
// to see Administrator password - you will need it to configure Jenkins via localhost:8080 UI
//    docker logs blue-ocean

pipeline {
    agent none
    options {
        buildDiscarder(logRotator(numToKeepStr:'10'))
        timeout(time: 20, unit: 'MINUTES')
        ansiColor('xterm')
    }

    stages {
        stage('cypress parallel tests') {
            parallel {
                // start several test jobs in parallel, and they all
                // will use Cypress Dashboard to load balance any found spec files
                stage('tester A') {
                    agent {
                        // this image provides everything needed to run Cypress
                        docker {
                            image 'jax-t-cypress-cucumber-chrome:1.0'
                        }
                    }
                    steps {
                        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/jax-t/cypress-cucumber']]])
                        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
                        sh 'npm ci'
                        sh 'npm run cy:verify'
                        echo "Running build ${env.BUILD_ID}"
                        sh "npm run test1"
                        sh "cp -r ${WORKSPACE}/cypress/cucumber-report ${JENKINS_HOME}/jobs/${env.JOB_NAME}/builds/${BUILD_ID}/cucumber-report"
                    }
                }

                // second tester runs the same command
                stage('tester B') {
                    agent {
                        // this image provides everything needed to run Cypress
                        docker {
                            image 'jax-t-cypress-cucumber-chrome:1.0'
                        }
                    }
                    steps {
                        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/jax-t/cypress-cucumber']]])
                        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
                        sh 'npm ci'
                        sh 'npm run cy:verify'
                        echo "Running build ${env.BUILD_ID}"
                         sh "npm run test2"
                        sh "cp -r ${WORKSPACE}/cypress/cucumber-report ${JENKINS_HOME}/jobs/${env.JOB_NAME}/builds/${BUILD_ID}/cucumber-report"
                    }

                }
            }

        }
        stage('report') {
            agent {
                // this image provides everything needed to run Cypress
                docker {
                    image 'jax-t-cypress-cucumber-chrome:1.0'
                }
            }
            steps {
                sh "node cucumber-html-generator2.js ${JENKINS_HOME}/jobs/${env.JOB_NAME}/builds/${BUILD_ID}/cucumber-report"
                publishHTML([allowMissing: false,
                             alwaysLinkToLastBuild: true,
                             keepAll: true,
                             reportDir: "${JENKINS_HOME}/jobs/${env.JOB_NAME}/builds/${BUILD_ID}/cucumber-report/html",
                             reportFiles: 'index.html',
                             reportName: 'HTML Report',
                             reportTitles: ''])
            }
        }
    }


}

