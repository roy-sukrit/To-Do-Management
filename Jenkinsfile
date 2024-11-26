pipeline {
    agent any
    stages {
       stage('Clone Repository') {
            steps {
                git branch: 'develop-qa', url: 'https://github.com/roy-sukrit/To-Do-Management.git'
            }
        }
        stage('Set Up Virtual Environment') {
            steps {
                sh '''
                    # 创建并激活虚拟环境
                    python3 -m venv venv
                    source venv/bin/activate
                    cd backend 

                    # 安装依赖
                    pip install -r requirements.txt
                '''
            }
        }
        stage('Run Tests') {
            steps {
                sh '''
                    source venv/bin/activate

                    # 运行测试并生成 Allure 报告
                    pytest --alluredir=allure-results
                '''
            }
        }
        stage('Generate and Check Allure Report') {
            steps {
                sh '''
                    # 生成 Allure 报告
                    allure generate allure-results -o allure-report --clean

                    # 检查成功率
                    successRate=$(grep -oP 'Success rate: \\d+' allure-report/index.html | awk '{print $3}')
                    echo "Test Success Rate: $successRate%"
                    if [ "$successRate" -ne 100 ]; then
                        echo "Tests did not pass with 100%. Exiting."
                        exit 1
                    fi
                '''
            }
        }




        // stage('Deploy to QA Env') {
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
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
