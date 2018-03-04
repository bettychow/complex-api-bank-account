const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const bodyParser = require('body-parser')
const morgan = require('morgan')


app.disable('x-powered-by')

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json())

const accountsRoutes = require('./src/routes/accounts')

app.use('/accounts', accountsRoutes)
app.use('/accounts/:acctId', accountsRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
}) 

const listener = () => {
  console.log(`Listening on port ${port}!`)
}
app.listen(port, listener)

module.exports = app