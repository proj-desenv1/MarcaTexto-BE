exports.validateFields = (userName, userEmail, userPassword) => {
    if (!userName || !userEmail || !userPassword) {
        const err = {status: 400, msg: "One of following params must not be null: userName, userEmail, userPassword"};
        throw err;
    }
}
