properties([pipelineTriggers([githubPush()])])

pipeline {
    agent any
    stages {
        stage('Checkout SCM - Frontend') {
            steps {
                checkout([
                 $class: 'GitSCM',
                 branches: [[name: 'master']],
                 userRemoteConfigs: [[
                    url: 'https://github.com/deepak010789/realworld-fe-app.git',
                    credentialsId: 'infra360-pem',
                 ]]
                ])
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                echo 'Running pytest..'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}