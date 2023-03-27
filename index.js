#! /usr/bin/env node
import { createServer, connect } from 'net'
import jsonfile from 'jsonfile'
import { Command } from 'commander'
import { dirname } from 'dirname-filename-esm'
import { join } from 'path'

const { name, version } = jsonfile.readFileSync(join(dirname(import.meta), './package.json'))

new Command(name)
  .version(version)
  .requiredOption('-p, --port <port>', 'Port to start TCP server on')
  .requiredOption('-s, --source <source>', 'Source address to forward')
  .action(async ({ port, source }) => {
    const listenPort = parseInt(port)
    const [sourceHost, sourcePortString] = source.split(':')
    const sourcePort = parseInt(sourcePortString)

    console.log('Source host:', sourceHost, 'Source port:', sourcePort)
    createServer(serverSocket => {
      const clientSocket = connect(sourcePort, sourceHost)
      serverSocket.pipe(clientSocket)
      clientSocket.pipe(serverSocket)
      clientSocket.on('error', e => {
        console.error(e)
      })
    }).listen(listenPort, () => {
      console.log('TCP server is listening on port', listenPort)
    })
  })
  .parse()
