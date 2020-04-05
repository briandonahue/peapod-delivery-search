const cookieSupport = require('axios-cookiejar-support').default
const tough = require('tough-cookie')

const jar = new tough.CookieJar();

const req = require('axios').create({
  baseURL: 'https://www.peapod.com/api/',
  jar: jar
})
cookieSupport(req)

module.exports = {
  makeInitialRequest: async () => {
    await req.get('http://www.peapod.com/shop/auth.jhtml')
  },
  makeSessionRequest: async () => {
    const res = await req.options('/v2.0/user/login', {
            gzip: true,
            jar: jar,
            headers: {
                'access-control-request-headers': 'accept, content-type',
                'access-control-request-method': 'POST',
                'accept': '*/*'
            }
        })
  },
  makeLoginRequest: async (user, pass) => {
    const res = await req.post('/v2.0/user/login', {
        gzip: true,
        jar: this.jar,
        headers: {
          'accept': 'application/json, text/plain, */*',
          'referer': 'http://www.peapod.com/shop/auth.jhtml'
        },
        json: {
          loginName: user,
          password: pass,
          rememberMe: true
        }
    })
  },
  getData: async () => {
  const resp = await req.get('/api/v2.0/user/slots', {
    params: {
      delivAvail: 'true',
      headers: 'true',
      pupAvail: 'true',
      selected: 'true',
      serviceType: 'D',
      viewDate: '2020-04-11'
    },
    headers: {
      'Host': 'www.peapod.com',
      'authority': 'www.peapod.com',
      'pragma': 'no-cache',
      'cache-control': 'no-cache,no-cache',
      'accept': 'application/json, text/plain, */*',
      'sec-fetch-dest': 'empty',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'referer': 'http://www.peapod.com/shop/auth.jhtml',
      'accept-language': 'en-US,en;q=0.9',
      'dnt': '1',
      'Postman-Token': '103f6779-479d-4550-bf17-299050293b8a,9681101d-fcde-4e95-bef2-70660588b2b2',
      'Host': 'www.peapod.com',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive'
    }
  })
  console.log(res.status)
  console.log(jar)

  }

}

