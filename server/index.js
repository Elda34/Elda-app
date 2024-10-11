const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const path = require('path')


const app = express()
app.use(cors({
    origin :  "http://23.20.155.44:8080",
    credentials : true,
    // optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api",router)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('X-Frame-Options', 'DENY');  // Prevent clickjacking attacks
    res.header('X-Content-Type-Options', 'nosniff'); // Prevent MIME type sniffing
    next();
});
;
// });

if(process.env.NODE_ENV === "production"){
    
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    })
  
}

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connect to DB")
        console.log("Server is running "+PORT)
    })
})
