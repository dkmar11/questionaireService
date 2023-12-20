pipeline {
    agent any
    environment{
        DOCKER_PASS = credentials('docker_password')
        SONAR_TOKEN = credentials('sonar_token')
        ORG_KEY = 'devops-questionary'
        PROJECT_KEY = 'devops-questionary_devops'
        TARGET_HOST = '192.168.100.138'
        TAG_VERSION = sh (script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }
    stages{
        stage('test'){
            agent{docker 'node:18-alpine3.16'}
            steps{
                sh 'npm install'
                sh 'npm test'
            }
            post{
                always{
                    archiveArtifacts artifacts: 'tests/test-results/', followSymlinks: false
                }
            }
        }

        stage('CodeInspection'){
            steps {
                withSonarQubeEnv('sonar_scanner'){

                    sh '/var/jenkins_home/.sonar/sonar-scanner-4.7.0.2747-linux/bin/sonar-scanner \
                        -Dsonar.organization=${ORG_KEY} \
                        -Dsonar.projectKey=${PROJECT_KEY} \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=https://sonarcloud.io'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    script {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }

        stage('Package'){
            steps{
                sh 'docker build -t at20_questionnaire_service .'
            }
        }

        stage('Publish'){
            steps{
                sh 'docker login -u dkmar11 -p ${DOCKER_PASS}'
                sh 'docker tag at20_questionnaire_service dkmar11/questionnaire:${TAG_VERSION}'
                sh 'docker push dkmar11/questionnaire:${TAG_VERSION}'
            }
            
        }
        stage('DeployToDev'){
            steps{
                sh 'export TAG_VERSION=${TAG_VERSION} && docker-compose -f docker-compose-israel.yaml up -d'
                sh 'echo command to run smoke test'
            }
        }

        stage('DeployToAuto'){
            steps{
                sh 'export TAG_VERSION=${TAG_VERSION} && DOCKER_HOST=ssh://$TARGET_HOST docker-compose -f docker-compose-israel.yaml up -d'
                sh 'echo command to run automation test'
            }
        }
    }

    post{
        always {
            sh 'docker image prune -a -f'
            sh 'docker system prune -a -f'
            emailext(
                subject: "Jenkins Result - ${BRANCH_NAME} branch - ${currentBuild.result}",
                body: """<html>
                    <body>
                        <h3>Additional Details:</h3>
                        <ul>
                            <li>Job Name: ${env.JOB_NAME}</li>
                            <li>Build Number: ${env.BUILD_NUMBER}</li>
                            <li>Build URL: ${env.BUILD_URL}</li>
                            <li>Git Branch: ${env.BRANCH_NAME}</li>
                        </ul>
                        <p>Console log is attached in this email.</p>
                        <p>Best regards!</p>
                    </body>
                </html>""",
                mimeType: 'text/html',
                to: 'izg.elt@gmail.com',
                attachLog: true
            )
        }

    }

}
