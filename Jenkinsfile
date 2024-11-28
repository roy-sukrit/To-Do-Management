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

                            # Generate Allure report (if necessary, you might want to serve it instead)
                            allure generate allure-results --clean -o allure-report

                            # Check test success rate from the Allure report
                            successRate=$(grep -oP 'Success rate: \d+' allure-report/index.html | awk '{print $3}')                            echo "Test Success Rate: $successRate%"

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
             // stage('Deployment to QA Env') {
        //     steps {
        //         sshagent(['JENKIN_PK']) {
        //             script {
        //                 sh '''
        //                     ssh -o StrictHostKeyChecking=no ec2-user@172.31.47.184 << EOF
        //                     set -e  # Exit on error
                            
        //                     # Backend deployment
        //                     cd To-Do-Management/backend
        //                     git checkout develop-qa
        //                     git pull
        //                     npm install
        //                     npm run build
        //                     echo 'Starting Backend Server...'
        //                     pm2 restart "Server-qa" --update-env || pm2 start npm --name "Server-qa" -- start
        //                     echo 'Backend Server is running successfully!'
                            
        //                     # Frontend deployment
        //                     cd ../frontend
        //                     npm install
        //                     npm run build
        //                     echo 'Starting Frontend Server...'
        //                     pm2 restart "Client-qa" --update-env || pm2 start npx --name "Client-qa" -- serve -s build
        //                     echo 'Frontend Server is running successfully!'       
        //                 '''
        //             }
        //         }
        //     }
        // }
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