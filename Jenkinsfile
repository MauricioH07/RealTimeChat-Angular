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
            "server/dev": ["DESA"],
            "server/prod": ["PROD"]
    ],
    deployStacksByBranch: [
            "server/dev/ext": ["swiftair"]
    ]
]

buildPipeline () {

    if ( argsMap.branch.startsWith("server")) {
        def parts = argsMap.branch.split("/")
        argsMap.put('buildArg', 'EXTRA_CONFIG=--configuration=' + parts[-1].toLowerCase())
    }

    buildAngularApp(argsMap)
}
