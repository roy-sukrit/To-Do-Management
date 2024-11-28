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

                            # Ensure the Allure results directory exists
                            if [ ! -d "allure-results" ]; then
                                echo "Allure results directory not found!"
                                exit 1
                            fi

                            # Generate Allure report (in the correct location)
                            allure generate allure-results --clean -o allure-report

                            # Debugging: Print the contents of the Allure report
                            echo "Contents of allure-report/index.html:"
                            cat allure-report/index.html

                            # Extract the success rate from the Allure report
                            successRate=$(grep -oP 'Success rate: \\d+' allure-report/index.html | awk '{print $3}')

                            # Check if successRate is empty or not found
                            if [ -z "$successRate" ]; then
                                echo "Could not find success rate in the report. Exiting...."
                                exit 1
                            fi

                            echo "Test Success Rate: $successRate%"

                            # Check if success rate is less than 90%
                            if [ "$successRate" -lt 90 ]; then
                                echo "Tests passed <90% :( Exiting...."
                                exit 1
                            fi
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