@Library("iris-jenkins-lib") _

def argsMap = [
    repo: 'external/swiftair/swiftfront',
    branch: "${BRANCH_NAME}",
    workDir: 'swiftfront',
    dockerWorkDir: '.',
    dockerfile: 'Dockerfile',
    imageName: 'iris/apps/swiftair',
    version: "23.04.00-SNAPSHOT",
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

