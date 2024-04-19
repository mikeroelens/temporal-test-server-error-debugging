import http from 'node:http';
import { TestWorkflowEnvironment } from '@temporalio/testing';

const hostname = '127.0.0.1';
const port = 9099;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, async () => {
  console.log(`Started HTTP server on port ${port}`);

  console.log(`Attempting to create Temporal test environment on already bound port ${port}...\n\n`);
  /**
   * This will fail with `[UnexpectedError: Failed to start ephemeral server: Failed connecting to test server after 5 seconds]`
   * Can't figure out how to get error logs though.
   */
  await TestWorkflowEnvironment.createLocal({
    server: {
      log: {
        format: 'pretty',
        level: 'debug',
      },
      port,
    },
  });
});

