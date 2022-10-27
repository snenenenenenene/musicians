# Musicians

This is the frontend repository for the Musicians project. See https://github.com/jstack-be/musicians--app for general information.

## Frontend setup

```...```

#### local development

Start app for development from `./frontend/`
```
yarn install
yarn start
```

#### Testing
You can use a [mock server](https://github.com/mocks-server/main) based on json files.

```
node ./switchEnv.js --env test
yarn mocks
```
**Switch to prod**
```
yarn set:env:prod
```

or start it with the docker compose in de main repo



