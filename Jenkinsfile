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
                    echo "Current Directory1: ${pwd()}"
                    python3 -m venv venv
                    source venv/bin/activate
                    cd To-Do-Management/backend
                    pip install -r requirements.txt
                    pytest --alluredir=allure-results
                    allure generate allure-results -o allure-report --clean
                    echo "Current Directory2: ${pwd()}"

                    # Check test success rate
                    successRate=$(grep -oP 'Success rate: \\d+' "/mnt/jenkins/workspace/QA Job/To-Do-Management/backend/allure-report/index.html" | awk '{print $3}')                       if [ "$successRate" -lt 90 ]; then
                    echo "Tests passed <90% :( Exiting...."
                    exit 1
                    fi
                '''
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
            allure includeProperties: false, jdk: '', results: [[path: 'allure-report']]
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
