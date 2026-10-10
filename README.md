# Jenkins CI Learning Project

## Overview

This project demonstrates Continuous Integration using Jenkins,
GitHub, and Node.js.

Jenkins retrieves the source code, builds the application, executes
unit tests, and archives a packaged application. A failed test stops
the pipeline before packaging.

## Application

The application contains an add(a, b) function.

Running it with the values 2 and 3 prints:

```text
Application result: 5
```

Two unit tests verify addition with positive and negative numbers.

## Project Files

- src/app.js: application source code.
- build.js: copies the application into the dist directory.
- test/app.test.js: automated unit tests.
- package.json: project information and npm commands.
- package-lock.json: dependency lockfile used by npm ci.
- Jenkinsfile: Declarative Pipeline stored with the source code.
- .gitignore: excludes generated files from Git.
- README.md: setup and validation documentation.

## Environment

- Ubuntu virtual machine.
- Jenkins running in Docker.
- Jenkins version: 2.541.3.
- Node.js version: 22.23.3.
- npm version: 10.9.9.
- GitHub repository:
  https://github.com/Dbayode/jenkins-ci-learning

## Jenkins Configuration

The Jenkins job uses Pipeline script from SCM with Git.

- Branch: main.
- Script path: Jenkinsfile.
- NodeJS tool name: node-lts.
- NodeJS home: /var/jenkins_home/local-node22.
- Automatic NodeJS installation: disabled.

The existing Node.js executable and npm installation were copied
from the Ubuntu VM into Jenkins home because automatic downloads
were too slow.

Relevant plugins include Pipeline, Git, and NodeJS.

## Pipeline Stages

### Checkout

Retrieves the repository using checkout scm.

### Build

Runs:

```bash
npm ci
npm run build
```

The build creates dist/app.js.

### Test

Runs:

```bash
npm test
```

Node.js executes the unit tests. A failing test returns a non-zero
exit code, causing Jenkins to fail the pipeline and skip packaging.

### Package

Runs:

```bash
npm pack
```

Creates jenkins-ci-learning-1.0.0.tgz. Jenkins archives the artifact
and records its fingerprint.

This stage packages the application; it does not deploy to a server.

## Local Validation

Run from the project directory:

```bash
npm ci
npm run build
npm test
npm pack
```

Expected result: two passing tests and a generated .tgz package.

## Automatic Builds

The pipeline can use Git polling:

```groovy
triggers {
    pollSCM('H/5 * * * *')
}
```

After the updated Jenkinsfile is run once, Jenkins checks for source
changes approximately every five minutes while Jenkins is running.

## Failure and Recovery Demonstration

The positive-number test normally expects add(2, 3) to return 5.

To demonstrate failure handling, the expected result is deliberately
changed to 6 and committed to GitHub.

The expected pipeline behaviour is:

- Checkout passes.
- Build passes.
- Test fails.
- Package is skipped.

The expectation is then restored to 5 and committed again. The
recovery build should pass both tests and archive the package.

## Challenges and Resolutions

### Invalid NodeJS installer selection

Jenkins reported an invalid tool ID and npm was unavailable.
The plugin version had been entered as a runtime version.
Selecting a valid Node.js runtime resolved the invalid selection.

### Slow Node.js download

A full download test inside the Jenkins container transferred only
950,164 bytes in 120 seconds. An IPv4 test was also slow.

The existing VM installation was copied into
/var/jenkins_home/local-node22, and Jenkins was configured to use
this local installation.

### npm not found

The pipeline initially could not locate npm. Node and npm were
verified inside the container, and the tool configuration was
corrected. A subsequent pipeline completed successfully.

### Limited VM disk space

The VM had approximately 1.3 GB of free space. Docker volumes were
preserved to avoid losing Jenkins or other application data.
Additional disk capacity remains a maintenance consideration.

## Security

Passwords and access tokens should be stored in Jenkins Credentials,
not committed to Git or written in the Jenkinsfile.

The recorded checkout used no credentials. Private repositories
require suitable read-access credentials.

## Validation Evidence

Complete this section using the actual build results:

- Initial successful build number:
- Deliberate failure build number:
- Recovery build number:
- Automatic trigger verified:
- Screenshot filenames:

## Submission

Include:

- GitHub repository URL.
- This README.
- Screenshot of the successful pipeline stages.
- Screenshot of the deliberate test failure and skipped Package stage.
- Screenshot of the successful recovery.
- Optional console logs.
