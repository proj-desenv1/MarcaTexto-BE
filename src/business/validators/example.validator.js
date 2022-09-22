exports.validateExample = (example) => {
    if (example.length == 0) {
        const err = {status: 404, message: "Example not found"};
        throw err;
    }
}