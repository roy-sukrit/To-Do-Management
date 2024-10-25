pipeline {
    agent any

    stages {
        stage('Deploy to EC2') {
            steps {
                sshagent(['JENKIN_PK']) { // Replace with your credentials ID
                    script {
                        // SSH into the EC2 instance and execute commands
                        sh '''
                            ssh -o StrictHostKeyChecking=no ec2-user@172.31.47.184 << 'EOF'
                            cd Todomanagement/backend
                            git checkout develo-qa
                            git pull
                            npm install
                            npm run build
                            pm2 restart Server-qa --update-env
                            pm2 save
                            EOF
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
