const validation =(req, res, next ) => {
    const{name, email , age } = req.body;

    if(!name){
       return res.status(400).json({
            sucess: 'false',
            message: 'Name is required!'
        })
    }

    if(!email){
       return res.status(400).json({
            sucess: 'false',
            message: 'Email is required!'
        })
    }
    if(!email.includes('@')){
       return res.status(400).json({
            sucess: 'false',
            message: 'Use Correct Email Address!'
        })
    }
     if(!age){
       return res.status(400).json({
            sucess: 'false',
            message: 'Age Required!'
        })
    }

    next();

}

module.exports = validation;