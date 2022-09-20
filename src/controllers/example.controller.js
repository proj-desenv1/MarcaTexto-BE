const exampleBusiness = require("../business/example.business")
const returnError = require("./utils/return-error")

exports.listExample = async(req, resp) => {
    try {
        const list = await exampleBusiness.listExample();
        resp.json(list);
    } catch (error) {
        returnError(error, resp);
    }
}