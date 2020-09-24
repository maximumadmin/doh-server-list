const download = (filename, text) => {
  const data = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  const element = document.createElement('a')
  element.setAttribute('href', data)
  element.setAttribute('download', filename)
  if (!document.createEvent) {
    element.click()
    return
  }
  const event = document.createEvent('MouseEvents')
  event.initEvent('click', true, true)
  element.dispatchEvent(event)
}

const parse = () => {
  var elements = [
    ...document
      .getElementById('user-content-publicly-available-servers')
      .parentElement
      .nextElementSibling
      .querySelectorAll('tbody tr > td:nth-child(2) a')
  ]
  var hostnames = elements.map(e => new URL(e.getAttribute('href')).hostname)
  return [...new Set(hostnames)].join('\n')
}

download('list.txt', parse())
