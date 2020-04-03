const moment = require('moment')
const fs = require('fs')

const req = require('axios').create({
  baseURL: 'https://www.peapod.com',
})

const calFormats = {
                      lastDay : '[Yesterday]',
                      sameDay : '[Today]',
                      nextDay : '[Tomorrow]',
                      lastWeek : '[last] dddd',
                      nextWeek : '[this] dddd',
                      sameElse : 'L'
                  }

const timeFormat = 'h:mm A'


async function main(){

  const sessionCookie = fs.readFileSync('./.cookie').toString();

  let currentDate = moment()

  for(let i = 0; i < 10; i++) {

    let targetDate = currentDate.format('YYYY-MM-DD')
    const available = await checkDeliveries(targetDate, sessionCookie)
    if(available && available.length > 0){
      available.forEach(el => {
        const start = moment(el.timeStart)
        const end = moment(el.timeEnd)
        console.log(`WINDOW AVAILABLE: ${start.calendar(null, calFormats)} ` +
                    `${start.format(timeFormat)} - ${end.format(timeFormat)}`)
      });
    }
    else {
      console.log("No slots available " + currentDate.calendar(null, calFormats))
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
      viewDate: date
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
  return available
}

main()
  .then(console.log)
  .catch(console.error)
  .catch((e) => {
    console.log('ERROR')
  })


