pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                'chmod +x setup_k6.sh'
                './setup_k6.sh'
                echo 'Running K6 performance tests...'
                k6 run scripts/WorkloadMixScript.js
            }
        }
    }
}
