@Library("iris-jenkins-lib") _

def argsMap = [
    repo: 'external/swiftair/swiftfront',
    branch: "${BRANCH_NAME}",
    workDir: 'swiftfront',
    dockerWorkDir: '.',
    dockerfile: 'Dockerfile',
    imageName: 'iris/apps/swiftair',
    dockerHubSitesByBranch: [
            "master": ["DESA"],
            "server/dev": ["DESA"],
            "server/prod": ["PROD"]
    ],
    deployStacksByBranch: [
            "master": ["swiftair"]
    ]
]

buildPipeline () {
    buildAngularApp(argsMap)
}

