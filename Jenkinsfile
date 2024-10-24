pipeline {
    agent any // Use any available agent
    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                // Uncomment to install dependencies
                // sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Uncomment to run your tests
                // sh 'npm test'
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Ensure the EC2 host is added to known_hosts

                    // SSH command to navigate to the backend folder, pull the latest code, and restart PM2
                    def sshCommand = """
                        ssh -vvv -o StrictHostKeyChecking=no ec2-user@<YOUR_EC2_IP_ADDRESS> << 'EOF'
                        echo "Connecting to EC2 instance..."
                        cd To-Do-Management/backend || exit 1
                        echo "Changed directory to To-Do-Management/backend."
                        git pull
                        echo "Pulled latest code."
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
