# forward-tcp
Forward TCP connections to a different TCP server

## npm
[`forward-tcp`](https://www.npmjs.com/package/forward-tcp)

```bash
npm i -g forward-tcp
```

## Usage
```bash
forward-tcp -p 3000 -s 100.115.92.2:8080
```
This example will start a TCP server on port `3000`, which can be accessed with `localhost:3000` and all upload / download will be forwarded to `100.115.92.2:8080`
