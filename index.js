const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: process.env.HANDLER_PATH, secret: process.env.HANDLER_SECRET });
const simpleGit = require('simple-git')("/repository");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const GIT_USERNAME = process.env.GIT_USERNAME;
const GIT_TOKEN = process.env.GIT_TOKEN;
const GIT_SOURCE = process.env.GIT_SOURCE;

const commands = [
	`echo https://${GIT_USERNAME}:${GIT_TOKEN}@${GIT_SOURCE} > ~/.git-credentials`,
	`cd /repository`,
	`git config --global credential.helper store`,
	`git config --global user.email "git-puller@github.com"`,
	`git config --global user.name "Github Puller"`,
	`git config --global --unset http.proxy`,
	`git config --global --unset https.proxy`
];

commands.forEach((command) => {
	exec(command)
		.then(() => {
			console.log(`Run Command : ${command}`);
		});
});

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('Path location not found');
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error: ', err.message)
})

handler.on('push', function (event) {
  if(event.payload.ref === process.env.GIT_REPOSITORY_REF){
    console.log("Execute Pull Command");
    simpleGit.pull(process.env.GIT_REPOSITORY_REMOTE, process.env.GIT_REPOSITORY_BRANCH, (response) => {
      console.log("Pull Command Executed!");
    })
  }
  console.log('Received a push event from %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})
