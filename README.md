# membrane-backend-cc


Public API REST that retrieves market information for trading pairs.

## Information

### API PORT

3001

### Local WebSocket PORT

9090

### Node Version

v16.19.1

### External API

- [Bitfinex: Market information](https://docs.bitfinex.com/reference#ws-public-books)

### Postman Collection

- [JSON to be imported](docs/membrane-backend-cc-api.postman_collection.json)

## Local testing
### Create env file

```sh
cp .env.sample .env
```
Note about setting the variable LOCAL_SOCKET_URL for WSL users. Execute this command in the powershell:
```sh
wsl hostname -I 
```
and set that IP instead of localhost.

### Install the packages

```sh
npm i
```


### Init the server

```sh
npm run start:dev
```

Note: This also will start the web socket server.
