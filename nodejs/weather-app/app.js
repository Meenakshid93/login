const express = require('express');
const employeeRouter = require('./router/employeeRouter')
const userRouter = require('./router/userRoute')
const app = express();
const errorHandler = require('./middleware/errorHandler')
const logging = require('./middleware/logging')
app.use(express.json());

app.use(logging);
app.use('/employee', employeeRouter);
app.use('/user', userRouter);
app.use(errorHandler);

app.listen('3000', ()=>{
    console.log('Server is running on port 3000!!')
}
)