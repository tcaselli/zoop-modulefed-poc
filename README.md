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
yarn install && yarn start
# in ./zoop-f-mf-app1
# in ./zoop-f-mf-app2
# and in ./zoop-f-mf-layout
```

Global layout application is available at : http://localhost:1900  
App1 standalone is available at : http://localhost:1901  
App2 standalone is available at : http://localhost:1902

## TODO list

- Add POC for usage of NextJS
- Add Zooplus logo on top. (available in zoop-f-mf-layout/src/assets/zooplus.jpg)
- Make changes in zoop-f-theme rebuild the css in MFs
- Add POC for usage of redux and react-router
- Add dockerfiles and docker-compose
- Plug sentry.io
- Plug Lokalise.com
