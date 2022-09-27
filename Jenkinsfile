properties([
    parameters([
        choice(name: 'Environment', choices: ["prod"].join('\n'), description: 'Deployment Environment'),
    ])
])

pipeline {
    agent any
	  environment{
			Test = "test"
	  } 
    stage('Build') {
      stage('Git') {
        steps {
          git 'https://github.com/deepak010789/realworld-fe-app'
        }
      }
      steps {
				sh 'npm install'
				sh 'npm run build'
			}
    } 
	}
}
