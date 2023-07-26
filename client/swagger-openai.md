## Generate typescript-angular client from swagger json using openai generator

- **Prerequisites**
  - swagger json file should be present in `swagger/your-swagger.json`
  - Java should be installed

Run this command: <br>
`sudo npx @openapitools/openapi-generator-cli generate -i swagger/your-swagger.json -g typescript-angular -o swagger-generated-client`
