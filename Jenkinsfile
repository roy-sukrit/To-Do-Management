pipeline {
    agent any // Use any available agent
    stages {
        stage('Deploy to EC2') {
            steps {
                script {
                    // SSH command to navigate to the backend folder, pull the latest code, and restart PM2
                    def sshCommand = """
                        ssh -o StrictHostKeyChecking=no ec2-user@172.31.47.184 << 'EOF'
                        echo "Connecting to EC2 instance..."                       
                        cd To-Do-Management/backend
                        echo "Changed directory to backend."
                        git pull origin main // Adjust branch as necessary
                        echo "Pulled latest code from repository."
                        npm install
                        echo "Installed dependencies."
                        npm run build
                        echo "Built the application."
                        pm2 restart Server-qa
                        echo "Restarted PM2 processes."
                        EOF
                    """
                    echo 'Deploying to EC2...'
                    sh sshCommand
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
