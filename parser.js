const axios = require('axios')
const cheerio = require('cheerio')

const parse = html => {
  const $ = cheerio.load(html)
  const table = $('#user-content-publicly-available-servers').parent().next()
  const anchors = table.find('tbody tr > td:nth-child(2) a')
  var hostnames = anchors.map((_, a) => new URL(a.attribs.href).hostname)
  return [...new Set(hostnames)]
}

const main = async () => {
  const url = 'https://github.com/curl/curl/wiki/DNS-over-HTTPS'
  let response = null
  try {
    response = await axios.default.get(url)
  } catch (e) {
    console.error(e)
    return 1
  }
  const hostnames = parse(response.data)
  console.info(hostnames.join('\n'))
  return 0
}

main().then(code => process.exit(code))
