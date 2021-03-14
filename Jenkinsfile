pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Running K6 performance tests...'
                k6 run scripts/WorkloadMixScript.js
            }
        }
    }
}
