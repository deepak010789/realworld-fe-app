pipeline {
    agent any
    parameters {
        string(name: 'IMAGE_ID', defaultValue: '', description: 'If you provide Image Id e.g ami-xxxxxxxxxx, It will skip Build Packer step.')
        choice(name: 'ENV', choices: ['prod'], description: 'Prod env')
    }
    environment {
        ENV="${params.ENV}"
        PACKER_LOG="${env.WORKSPACE}/deepak010789/packer.log"
        ssh_key_path="/var/lib/jenkins/.ssh/infra360"
    }
    stages {
        stage('Infra clone') {
            steps {
                dir('deepak010789') {
                    deleteDir()
                    git credentialsId: 'infra360-pem', poll: false, url: 'git@git.toptal.com:aron.szekely/deepak010789.git', branch: "deployment_testing"
                }
            }
        }
        stage('Build Packer') {
            when {
                expression { IMAGE_ID == '' }
            }
            steps {
                ansiColor('xterm') {
                    dir("${env.WORKSPACE}/deepak010789") {
                        sh 'export ssh_key_path=${ssh_key_path}'
                        sh 'packer build packer/frontend.json | tee "${PACKER_LOG}"  || { echo "packer build step failed" ; exit 1; }'
                        sh './init/copy_ami_id.sh realworld-fe-app'
                    }
                    script {
                        IMAGE_ID = readFile(file: './image_id.txt')
                        echo "${IMAGE_ID}"
                    }
                }
            }
        }
        stage('Terraform Apply & Rolling Deployment') {
            when {
                expression { IMAGE_ID.startsWith('ami-') }
            }
            steps {
                ansiColor('xterm') {
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
