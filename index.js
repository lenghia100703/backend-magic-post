const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRoute = require('./routes/authRoute');
const districtRoute = require('./routes/districtRoute');
const provinceRoute = require('./routes/provinceRoute');
const roleRoute = require('./routes/roleRoute');
const userRoute = require('./routes/userRoute');
const packageRoute = require('./routes/packageRoute');

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());

// routers
app.use('/auth', authRoute);
app.use('/district', districtRoute);
app.use('/province', provinceRoute);
app.use('/role', roleRoute);
app.use('/user', userRoute);
app.use('/package', packageRoute);

// connect to database

mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => {
        console.log('Connected to db');
        app.listen(process.env.PORT, () => {
            console.log('Sever is running on ' + process.env.PORT);
        });
    })
    .catch((err) => console.log(err));
