import app from './app';
const swaggerUi = require('swagger-ui-express');
const {swaggerSpec} = require('../docs/swagger.ts')
import logger from './logger';

const PORT = process.env.PORT || 8080;

//Swagger Init
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

