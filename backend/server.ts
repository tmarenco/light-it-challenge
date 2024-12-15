import app from './app'
const port = 5000
app.listen(port, '0.0.0.0',() => {
  console.log(`App listening at http://0.0.0.0:${port}`)
})