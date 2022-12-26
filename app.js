require('dotenv').config();

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { DataSource } = require('typeorm')

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('morgan'));

const appDataSource = new DataSource({
    type: process.env. TYPEORM_CONNECTION,
    host: process.env. TYPEORM_HOST,
    port: process.env. TYPEORM_PORT,
    username: process.env. TYPEORM_USERNAME,
    password: process.env. TYPEORM_PASSWORD,
    database: process.env. TYPEORM_DATABASE
});

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch(err=>{
        console.log("err");
    });

app.get('/ping', (req,res) =>{
    res.status(200).json({ message: 'pong'})
});

app.post('/signup', async(req, res) =>{
    const { name, email, password } = req.body;
    await appDataSource.query(
        `INSERT INTO users(
            name,
            email,
            password
        )VALUES (?, ?, ?);
        `,
        [ name, email, password ]
    );
    res.status(201).json({ message: "userCreated" })
})

app.post('/posting', async(req, res) =>{
    const {title, content, user_id} = req.body;
    console.log(title)
    await appDataSource.query(
        `INSERT INTO posts(
            title,
            content,
            user_id
        )VALUES (?,?,?);
        `,
        [ title, content, user_id]
    );
    res.status(201).json({ message : "postCreated"})
})

const PORT = 3001

const start = async () => {
    app.listen(PORT, () => console.log(`server is listenning on ${PORT}`));
};

start()