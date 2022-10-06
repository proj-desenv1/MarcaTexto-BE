module.exports = (error) => {
    if(error.response) {
        const err = {
            status: error.response.status,
            msg: error.response.data
        };
        throw err;
    }
}