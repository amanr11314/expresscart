
// npx sequelize model:create --name User --attributes "username:string,unique:true]
const jsonData = require('../schema/user.json')

// Extract the model name and attributes from the JSON data
const modelName = jsonData.name;
const type = jsonData.type;
const attributes = jsonData.attributes.map(attribute => {
    const attributeName = Object.keys(attribute)[0];
    const attributeType = attribute[attributeName];
    return `${attributeName}:${attributeType}`;
});

// Generate the Sequelize CLI command
const command = `npx sequelize-cli model:${type} --name ${modelName} --attributes ${attributes.join(',')}`;

console.log(command);