// require('dotenv').config({ path: './.env' })

var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: process.env.HANDLER_PATH, secret: process.env.HANDLER_SECRET })
const simpleGit = require('simple-git')(process.env.GIT_REPOSITORY_PATH)

console.log(process.env.HANDLER_PATH)

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  if(event.payload.ref === process.env.GIT_REPOSITORY_REF){
    console.log('pulling');
    simpleGit.pull(process.env.GIT_REPOSITORY_REMOTE, process.env.GIT_REPOSITORY_BRANCH, (response) => {
      console.log("Pull success");
    })
  }
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})
