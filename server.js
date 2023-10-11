import { fastify } from 'fastify'
//utlizando armazenamento em memoria
//import { DatabaseMemory } from "./database-memory.js";
//utilizando banco de dados postgres
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
  const {title, description, duration } = request.body

  await database.create({
    title: title,
    description: description,
    duration: duration,
    //se chave e valor com mesmo nome usar short sintaxe
    //title,
    //description,
    //duration
  })

  return reply.status(201).send()
})

server.get('/videos', async (request) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const {title, description, duration } = request.body

  await database.update(videoId, {
    title,
    description,
    duration,
  })

  return reply.status(204).send()

})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()

})

server.listen({
  port: process.env.PORT ?? 3333,
})