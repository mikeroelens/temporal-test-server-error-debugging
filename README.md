**Reproduction Steps:**
1. Clone repo
2. `npm install`
3. `node index.js`


The script starts an HTTP server on port 9099. It then tries to start a test Temporal server on the same port 9099, which obviously won't work. After 5s it fails with this error:
```bash
[UnexpectedError: Failed to start ephemeral server: Failed connecting to test server after 5 seconds]
```

No matter what I do though I can't get the error logs from the CLI executable to identify what the issue is. 

However, if you start the CLI executable directly from the command line you can see the exact error `"error":"listen tcp 127.0.0.1:9099: bind: address already in use"`. E.g.:
```bash
./temporal-sdk-typescript-1.9.1 server start-dev --port 9099

{"level":"info","ts":"2024-04-19T14:46:14.500-0400","msg":"Use rpc address 127.0.0.1:9099 for cluster active.","component":"metadata-initializer","logging-call-at":"fx.go:732"}
{"level":"info","ts":"2024-04-19T14:46:14.506-0400","msg":"historyClient: ownership caching disabled","service":"history","logging-call-at":"client.go:82"}
{"level":"info","ts":"2024-04-19T14:46:14.507-0400","msg":"Created gRPC listener","service":"history","address":"127.0.0.1:58934","logging-call-at":"rpc.go:152"}
{"level":"info","ts":"2024-04-19T14:46:14.510-0400","msg":"Created gRPC listener","service":"matching","address":"127.0.0.1:58936","logging-call-at":"rpc.go:152"}
{"level":"info","ts":"2024-04-19T14:46:14.510-0400","msg":"historyClient: ownership caching disabled","service":"matching","logging-call-at":"client.go:82"}
{"level":"info","ts":"2024-04-19T14:46:14.513-0400","msg":"historyClient: ownership caching disabled","service":"frontend","logging-call-at":"client.go:82"}
{"level":"fatal","ts":"2024-04-19T14:46:14.513-0400","msg":"Failed to start gRPC listener","error":"listen tcp 127.0.0.1:9099: bind: address already in use","service":"frontend","address":"127.0.0.1:9099", ...
```

https://www.loom.com/share/2abd97595a3f4f278acf5953ff5157aa
