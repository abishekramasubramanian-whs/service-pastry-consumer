
# Navika template source code repository structure

This is a template for starting new service in the Whitehat navika project. All services, at minimum, must have the following files:

```text
.
├── CONTRIBUTING.md
├── OWNERS
├── README.md
├── azure-pipelines.yaml
├── build
│   └── docker
│       └── Dockerfile
├── code-of-conduct.md
├── deploy
│   ├── app
│   └── crd
├── docs
├── src
│   └── app
│       ├── package.json
│       └── server.js
└── tests
```

- a `README.md` outlining the service objective and api's it implements
- an `OWNERS` with the project leads listed as approvers
- a `CONTRIBUTING.md` outlining how to contribute to the service
- an unmodified copy of `code-of-conduct.md` from this repo, which outlines the consequences of breaking the code
- a `.github/pull_request_template.md` with all details of feature/bug implemented which are necessary to effectively tests and operate the service
- a `build/docker/Dockerfile` that defines main images thats built from this project
- a `deploy` folder that collects all kubenentes deployment manifests that the service should deploy including crd's
- a `docs` folder to capture internal vs external documentation of the service and api's
- a `linters` folder that collect applicable linters
- a `src/app` folder for source code
- a `test` folder for storing unit, contract and module tests


And optional files depending on the requirements,
- `build/docker/Dockerfile.<optional_image_name>` any additional images that should be built from this repository
