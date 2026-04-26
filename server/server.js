import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3030

app.use(cors())
app.use(express.json())

app.get('/api/health', (req,res) => {
    res.send({status: 'ok', message: 'Server is up and running!' })
})


app.listen(PORT, () => {
    console.log(`Server is flying on http://localhost:${PORT}`)
})