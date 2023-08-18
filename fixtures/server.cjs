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

  if (resource === undefined || record === undefined) {
    console.warn('Attempted to retrieve unknown record on', resource);
    return reply.status(400).send();
  }

  const httpRecord = record[method.toLocaleLowerCase()];

  if (httpRecord === undefined) {
    console.warn('Attempted to retrieve record of unknown http method', method);
    return reply.status(404).send();
  }

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
