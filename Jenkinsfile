pipeline {
    agent any
    stages {
        stage('Test Stage - Python/Allure') {
            steps {
                script {
                    dir('To-Do-Management/backend') {
                        sh '''
                            python3 -m venv venv
                            source venv/bin/activate
                            pip install -r requirements.txt

                            pytest --alluredir=allure-results

                            if [ ! -d "allure-results" ]; then
                                echo "Allure results directory not found!"
                                exit 1
                            fi

                            allure generate allure-results --clean -o allure-report

                            echo "Contents of allure-report/data/suites.csv:"
                            cat allure-report/data/suites.csv

                            passedTests=$(awk -F, 'NR > 1 && $6 == "\"passed\"" {count++} END {print count}' allure-report/data/suites.csv)
                            totalTests=$(awk -F, 'NR > 1 {count++} END {print count}' allure-report/data/suites.csv)


                            if [ "$totalTests" -gt 0 ]; then
                            successRate=$(( (passedTests * 100) / totalTests ))
                            echo "Success rate: $successRate%"
                            else
                            echo "No tests found."
                            exit
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