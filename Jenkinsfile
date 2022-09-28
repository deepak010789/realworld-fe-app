pipeline {
    agent any
    parameters {
        choice(name: 'ENV', choices: ['prod'], description: 'Prod env')
    }
    environment {
        ENV="${params.ENV}"
        PACKER_LOG="${env.WORKSPACE}/deepak010789/packer.log"
        SSH_KEY_PATH="/var/lib/jenkins/.ssh/infra360"
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
            steps {
                dir("${env.WORKSPACE}/deepak010789") {
                    ansiColor('xterm') {
                        sh 'packer build -machine-readable packer/frontend.json -var "SSH_PRIVATE_KEY_FILE_PATH=${SSH_KEY_PATH}" | tee "${PACKER_LOG}"  || { echo "packer build step failed" ; exit 1; }'
                        // sh 'IMAGE_ID=$(cat "${PACKER_LOG}" | awk "match($0, /ami-.*/) { print substr($0, RSTART, RLENGTH) }" | tail -n 1 | tr -d "\\n")'
                        // echo "$IMAGE_ID"
                        // echo "$IMAGE_ID" >> "${env.WORKSPACE}/deepak010789/image_id.txt"
                    }
                }
            }
        }
        // stage('Terraform Apply & Rolling Deployment') {
        //     steps {
        //         dir("${env.WORKSPACE}/deepak010789") {
        //             ansiColor('xterm') {
        //                 sh 'terraform init'
        //                 sh 'terraform plan -target=module.frontend -var image_id_frontend=${IMAGE_ID} -var instance_refresh_frontend="[1]"'
        //             }
        //         }
        //     }
        // }
    }
}
