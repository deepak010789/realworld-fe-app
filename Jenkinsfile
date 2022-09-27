properties([
    parameters([
        choice(name: 'Environment', choices: ["prod"].join('\n'), description: 'Deployment Environment'),
    ])
])

pipeline {
    agent any
	tools {nodejs "node"}
	environment{
			Test = "test"
	}
    stages {
        stage('Build') {
            steps {
				sh 'npm install'
				sh 'npm run build'
			}
        }
	}
 }