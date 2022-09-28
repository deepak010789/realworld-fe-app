pipeline {
    agent any
    parameters {
        choice(name: 'ENV', choices: ['prod'], description: 'Prod env')
    }
    environment {
        ENV="${params.ENV}"
        PACKER_LOG="${env.WORKSPACE}/deepak010789/packer.log"
        ssh_key_path="/var/lib/jenkins/.ssh/toptal"
    }
    stages {
        stage('Infra clone') {
            steps {
                dir('deepak010789') {
                    deleteDir()
                    git credentialsId: 'infra360-pem', poll: false, url: 'git@git.toptal.com:aron.szekely/deepak010789.git', branch: "main"
                }
            }
        }
        stage('Build Packer') {
            steps {
                ansiColor('xterm') {
                    script {
                        sh 'export ssh_key_path=${ssh_key_path}'
                        sh 'packer build deepak010789/packer/frontend.json | tee "${PACKER_LOG}"  || { echo "packer build step failed" ; exit 1; }'
                        sh './deepak010789/init/copy_ami_id.sh realworld-fe-app'
                    }
                }
            }
        }
        stage('Terraform Apply & Rolling Deployment') {
            steps {
                ansiColor('xterm') {
                    script {
                        IMAGE_ID = readFile(file: './image_id.txt')
                        echo "${IMAGE_ID}"
                    }
                    dir("${env.WORKSPACE}/deepak010789") {
                        echo "${IMAGE_ID}"
                        sh "terraform init -reconfigure"
                        sh "terraform apply -auto-approve -target=module.frontend -var instance_refresh_frontend=\"[1]\" -var image_id_frontend=${IMAGE_ID}"
                    }
                }
            }
        }
    }
}
