const peapodApi = require('../peapod')


const argv = require('yargs')
.option('username', {
  alias: 'u',
  describe: 'Your peapod username.'
})
.option('password', {
  alias: 'p',
  describe: 'Your peapod password.'
})
.version(false)
.demandOption(['username', 'password'], 'You must supply a username and password.')
.help()
.argv


const main = async () => {
  try{
    await peapodApi.makeInitialRequest()
    await peapodApi.makeSessionRequest()
    await peapodApi.makeLoginRequest(argv.username, argv.password)
    await peapodApi.getData()
  }
  catch(ex) {
    console.error(ex.message)
    console.error(ex.config.url)
  }
}

main()

