pipeline {
    agent any
    stages {
        stage('Deploy to EC2') {
            steps {
                sshagent(['JENKIN_PK']) { // Replace with your credentials ID
            sh 'ssh  -vvv -o StrictHostKeyChecking=no ec2-user@172.31.47.184' 
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
