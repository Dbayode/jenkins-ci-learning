pipeline {
    agent any

    tools {
        nodejs 'node-lts'
    }

    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Package') {
            steps {
                sh 'npm pack'
                archiveArtifacts(
                    artifacts: 'jenkins-ci-learning-*.tgz',
                    fingerprint: true
                )
            }
        }
    }
}
