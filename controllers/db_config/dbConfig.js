const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.DB_REGION
})

module.exports = {
    AWS
}