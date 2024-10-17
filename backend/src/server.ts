import app from './app';
const swaggerUi = require('swagger-ui-express');
const {swaggerSpec} = require('../docs/swagger')
import logger from './logger';

const PORT = process.env.PORT || 8080;

//Swagger Init
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Global - HealthCheck API
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Server is running smoothly!!',
    responseTime:process.hrtime,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

