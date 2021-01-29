function checkUserID(req, res, next) { 
    // if(req.query.user == 'admin'){
    //     next()
    // } else {
    //     res.redirect('/')
    // }
    next()
} 

module.exports = checkUserID