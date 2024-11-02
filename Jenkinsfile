pipeline {
    agent any

    stages {
        stage('Deploy to QA Env') {
            steps {
                sshagent(['JENKIN_PK']) {
                    script {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ec2-user@172.31.47.184 << 'EOF'
                            cd To-Do-Management/backend
                            git checkout develop-qa
                            git pull
                            npm install
                            npm run build
                            echo 'Started : Starting Backend Server!'
                            pm2 restart "Server-qa" --update-env || pm2 start npm --name "Server-qa" -- start
                            echo 'Completed : Backend Server is up and running Successfully!'
                            cd ../frontend
                            npm install
                            npm run build
                            echo 'Started : Starting Frontend Server!'
                            pm2 restart "Client-qa" --update-env || pm2 start npx --name “Client-qa” -- serve -s ./dist
                            echo 'Completed : Client Server is up and running Successfully!'
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
