pipeline {
    agent any
    stages {
        stage('Test Stage - Python/Allure') {
            steps {
                sh '''
                    # Clone repository
                    if [ -d "To-Do-Management" ]; then
                    git pull origin develop-qa
                    else
                    git clone --branch develop-qa https://github.com/roy-sukrit/To-Do-Management.git
                    fi

                    # Set up virtual environment and install dependencies
                    python3 -m venv venv
                    source venv/bin/activate
                    cd To-Do-Management/backend
                    pip install -r requirements.txt

                    # Run tests and generate Allure report
                    pytest --alluredir=allure-results
                '''
            }
        }
    }
    post {
        always {
            // Publish Allure report
            allure includeProperties: false, jdk: '', results: [[path: '/To-Do-Management/backend/allure-results']]
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}