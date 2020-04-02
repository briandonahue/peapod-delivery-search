const moment = require('moment')
const req = require('axios').create({
  baseURL: 'https://www.peapod.com',
})
const sessionCookie = "COOKIE HERE"


async function main(){

  let currentDate = moment()

  for(let i = 0; i < 15; i++) {

    let targetDate = currentDate.format('YYYY-MM-DD')
    console.log(`Trying ${targetDate}...`)
    const available = await checkDeliveries(targetDate, sessionCookie)
    if(available && available.length > 0){
      available.forEach(el => {
        console.log(el)
      });
    }
    else {
      console.log("No slots available on " + targetDate)
    }

    currentDate.add(1, 'days').format('YYYY-MM-DD')
  }



}

async function checkDeliveries(date, sessionCookie) {

  const resp = await req.get('/api/v2.0/user/slots', {
    params: {
      delivAvail: 'true',
      headers: 'true',
      pupAvail: 'true',
      selected: 'true',
      serviceType: 'D',
      viewDate:'2020-04-06'
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
      'referer': 'https://www.peapod.com/pages/coronavirus',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': sessionCookie,
      'dnt': '1',
      'Postman-Token': '103f6779-479d-4550-bf17-299050293b8a,9681101d-fcde-4e95-bef2-70660588b2b2',
      'Host': 'www.peapod.com',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive'
    }
  })

  var slots = resp.data.response.slots;
  var available = slots.filter((el) => {
    return el.statusCode !== 'SO'
  })
}

main()
  .then(console.log)
  .catch(console.error)


