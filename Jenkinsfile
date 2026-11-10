pipeline {
    agent any

    parameters {
        string(name: 'REGISTRY', defaultValue: 'ghcr.io/your-org', description: 'Container registry/repository prefix')
    }

    options {
        skipDefaultCheckout()
        timestamps()
    }

    environment {
        REGISTRY = "${params.REGISTRY}"
        IMAGE_PREFIX = "${params.REGISTRY}/recipe"
        K8S_NAMESPACE = 'recipe'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'CI=true npm test -- --watchAll=false'
                sh 'npm ci --prefix server'
            }
        }

        stage('Build and publish images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'recipe-registry',
                        usernameVariable: 'REGISTRY_USER',
                        passwordVariable: 'REGISTRY_PASSWORD'
                    )
                ]) {
                    script {
                        def tag = env.GIT_COMMIT.take(12)
                        sh 'REGISTRY_HOST="${REGISTRY%%/*}"; echo "$REGISTRY_PASSWORD" | docker login "$REGISTRY_HOST" --username "$REGISTRY_USER" --password-stdin'
                        sh "docker build -t ${IMAGE_PREFIX}-frontend:${tag} ."
                        sh "docker build -t ${IMAGE_PREFIX}-backend:${tag} server"
                        sh "docker push ${IMAGE_PREFIX}-frontend:${tag}"
                        sh "docker push ${IMAGE_PREFIX}-backend:${tag}"
                        env.IMAGE_TAG = tag
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([
                    string(credentialsId: 'recipe-jwt-secret', variable: 'JWT_SECRET')
                ]) {
                    sh 'kubectl apply -f k8s/namespace.yaml'
                    sh 'kubectl apply -f k8s/configmap.yaml -n "$K8S_NAMESPACE"'
                    sh 'kubectl create secret generic recipe-secrets -n "$K8S_NAMESPACE" --from-literal=JWT_SECRET="$JWT_SECRET" --dry-run=client -o yaml | kubectl apply -f -'
                    sh 'kubectl apply -f k8s/backend.yaml -f k8s/frontend.yaml -f k8s/ingress.yaml -n "$K8S_NAMESPACE"'
                    sh "kubectl -n ${K8S_NAMESPACE} set image deployment/recipe-backend backend=${IMAGE_PREFIX}-backend:${IMAGE_TAG}"
                    sh "kubectl -n ${K8S_NAMESPACE} set image deployment/recipe-frontend frontend=${IMAGE_PREFIX}-frontend:${IMAGE_TAG}"
                    sh "kubectl -n ${K8S_NAMESPACE} rollout status deployment/recipe-backend --timeout=180s"
                    sh "kubectl -n ${K8S_NAMESPACE} rollout status deployment/recipe-frontend --timeout=180s"
                }
            }
        }
    }
}
