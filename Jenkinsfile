pipeline {
    agent any // Use any available agent
    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                echo "NODE_ENV: ${env.REMOTE_HOST_QA}"


                // Command to install dependencies
                // sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Command to run your tests
                // sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // Command to deploy your application
                // Replace with your deployment script/commands
                // sh 'echo "Deploying to server..."'
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
