@Library("jenkins-pipeline-libraries") _

pipeline {
    agent {
        docker {
            label "worker"
            image "docker-data-solution-jenkins-node-aws-dev.dr-uw2.adobeitc.com/node-aws:11.15.0-10"
            args  "-v /etc/passwd:/etc/passwd"
            registryUrl "https://docker-data-solution-jenkins-node-aws-dev.dr-uw2.adobeitc.com"
            registryCredentialsId "artifactory-datasoln"
        }
    }

    environment {
        HOME = "."
        TMPDIR = "./temp"
        AWS_URL = credentials("event-collector-url")
    }

    stages {
        stage("Lint") {
            steps {
                sh "npm install"
                sh "npm run lint"
            }
        }

        stage("Format") {
            steps {
                sh "npm run format"
            }
        }

        stage("Test") {
            steps {
                sh "npm run test"
            }
        }

        stage("Build QA") {
            when {
                branch "main"
            }

            steps {
                script {
                    sh "npm run build:dev"
                }
            }
        }

        stage("Deploy QA") {
            when {
                branch "main"
            }

            steps {
                klam("klam-data-solutions-qa-api")
                sh "aws s3 sync ./dist s3://${AWS_URL} --delete"
            }
        }
    }

    post {
        always {
            deleteDir()
            slack(currentBuild.result, "#datasolutions-jenkins")
        }
    }
}
