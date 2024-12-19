pipeline {
    agent any
    stages {
        stage('Test Python/Allure') {
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

                            passedTests=$(awk -F, 'NR > 1 && $6 ~ /passed/ {count++} END {print count}' allure-report/data/suites.csv)
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
        stage('Deploy QA EC2') {
            steps {
                sshagent(['JENKIN_PK']) {
                    script {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ec2-user@172.31.47.184 << EOF
                            set -e  # Exit on error
                            
                            # Backend deployment
                            cd To-Do-Management/backend
                            git checkout develop-qa
                            git pull
                            npm install
                            npm run build
                            echo 'Starting Backend Server...'
                            pm2 restart "Server-qa" --update-env || pm2 start npm --name "Server-qa" -- start
                            echo 'Backend Server is running successfully!'
                            
                            # Frontend deployment
                            cd ../frontend
                            npm install
                            npm run build
                            echo 'Starting Frontend Server...'
                            pm2 restart "Client-qa" --update-env || pm2 start npx --name "Client-qa" -- serve -s build
                            echo 'Frontend Server is running successfully!'       
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