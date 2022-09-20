const exampleRepository = require("../repository/example.repository");
const exampleValidator = require("./validators/example.validator");

exports.listExample = async () => {
    const example = await exampleRepository.listExample();
    exampleValidator.validateExample(example);
    return example;
}