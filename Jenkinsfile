pipeline {
    agent any
    stages {
        stage('Test Stage - Python/Allure') {
            steps {
                script {
                    // Ensure you are working in the correct directory
                    dir('To-Do-Management/backend') {
                        // Set up virtual environment and install dependencies
                        sh '''
                            python3 -m venv venv
                            source venv/bin/activate
                            pip install -r requirements.txt

                            # Run tests and generate Allure report
                            pytest --alluredir=allure-results
                        '''
                    }
                }
            }
        }
    }
    post {
        always {
            // Publish Allure report after test execution
            allure includeProperties: false, jdk: '', results: [[path: 'To-Do-Management/backend/allure-results']]
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}