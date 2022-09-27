properties([
    parameters([
        choice(name: 'Environment', choices: ["prod"].join('\n'), description: 'Deployment Environment'),
    ])
])

pipeline {
    agent any
    stages {
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