# Zooplus module federation POC

## Launch the app

### Launch the server

```sh
mvn install && mvn spring-boot:run
# in ./zoop-b-ms-app
```

Go to http://localhost:8080/swagger-ui.html

### Launch microfrontends

```sh
# in ./zoop-f-mf-layout-ssr
yarn install
yarn install:deps
yarn build:frontend
yarn start:frontend

# in another tab in ./zoop-f-mf-layout-ssr
yarn start:backend
```

Global layout application is available at : http://localhost:1900  
App1 standalone is available at : http://localhost:1901  
App2 standalone is available at : http://localhost:1902
SSR app with redux is available at : http://localhost:1904

## TODO list

- Add POC for usage of NextJS (Header)
- Make changes in zoop-f-theme rebuild the css in MFs
- Add POC for usage of redux and react-router (providers in mf-layout)
- Add dockerfiles and docker-compose (as we don't use real packages not sure about that for dev part)
- Plug sentry.io
- Plug Lokalise.com
