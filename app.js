import express from 'express'
import env from 'dotenv'
env.config()
const app = express()
const port = process.env.PORT
import taskRoutes from './router/taskRoutes.js'
app.use(express.json())
app.use('/task', taskRoutes)

app.use('/', (req, res) => {
	res.send('home')
})
app.listen(port, () => {
	console.log('Example app listening on port 3000!')
})
