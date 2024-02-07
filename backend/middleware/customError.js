class customError extends Error{
<<<<<<< HEAD
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = customError;
=======
    constructor(message,statuscode){
        super(message);
        this.statuscode=statuscode;
    }
}
module.exports=customError;
>>>>>>> origin/main
