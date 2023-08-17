const Fastify = require('fastify');
const { readFileSync } = require('fs');
const { join } = require('path');

const filepath = join(__dirname, 'http-records.json');
const filebuffer = readFileSync(filepath);
const filecontent = filebuffer.toString();
const records = JSON.parse(filecontent);

const server = Fastify({});

server.all('/*', (request, reply) => {
  const resource = request.headers['app-resource-request'];
  const method = request.method;

  const record = records[resource];

  if (
    resource === undefined ||
    record === undefined ||
    record[method.toLocaleLowerCase()] === undefined
  ) {
    console.log('Attempted to retrieve invalid record on', resource);
    return reply.status(400).send();
  }

  if (record[method.toLocaleLowerCase()] === undefined) {
    console.log(
      'Attempted to retrieve resource of unknown http method',
      method,
    );
    return reply.status(404).send();
  }

  const httpRecord = record[method.toLocaleLowerCase()];
  console.log('Found valid record for resource', method, resource);
  return reply.status(httpRecord.status).send(httpRecord.data);
});

const start = async () => {
  try {
    await server.listen({ port: 53242 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
