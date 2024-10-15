import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import openapi from './openapi.json';


const options: Options = {
  swaggerDefinition: openapi,
  apis: [], 
};


export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition:openapi,
  apis: ['./src/routes/*.ts'],
});
