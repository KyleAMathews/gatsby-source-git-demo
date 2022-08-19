const { createInterceptor } = require( '../gatsby-plugin-preview/node_modules/@mswjs/interceptors')
const nodeInterceptors = require( '../gatsby-plugin-preview/node_modules/@mswjs/interceptors/lib/presets/node').default
const got = require(`got`)

const interceptor = createInterceptor({
  modules: nodeInterceptors,
  resolver(request, ref) {
    // Optionally, return a mocked response.
  },
})

const requestTimings = new Map()

interceptor.on('request', (request) => {
  requestTimings.set(request.id, new Date().getTime())
  console.log('[%s] %s %s', request.method, request.url.toString(), request.id)
  // console.log(`request`, request)
})

interceptor.on('*', (type) => {
  console.log({type})
})
interceptor.on('response', (req, res) => {
  const start = requestTimings.get(req.id)
  const elapsed = new Date().getTime() - start
  // console.log('[%s] %s %s %d', res.status, res.body, req.id, elapsed)
  console.log(`req`, req)
  // req.on(`data`, (data) => {
    // console.log(data)
  // })
})


interceptor.apply()

async function main() {
  await got(`http://localhost:9000/new-design-cooper-hewitt/`)
  // await new Promise(resolve => setTimeout(() => {resolve()},500))
  // await got(`http://localhost:9000/situated-software-hyper-local-ice-cream-business/`)
}

main()
