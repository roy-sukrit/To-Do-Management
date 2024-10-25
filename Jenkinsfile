pipeline {
    agent any
    stages {
        stage('Deploy to EC2') {
            steps {
                script {
                   sh 'ssh -o StrictHostKeyChecking=no ec2-user@172.31.47.184'
                   echo 'Success '

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
