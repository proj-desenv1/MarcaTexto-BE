module.exports = (error, response) => {
    console.log(`error: ${error}`);
    error.status 
        ? response.status(error.status).json(error.message)
        : response.status(500).json({message: "Unidentified error"});  
}