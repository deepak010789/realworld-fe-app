pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                echo 'Testing..'
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
