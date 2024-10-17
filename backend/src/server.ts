import app from './app';
const swaggerUi = require('swagger-ui-express');
const {swaggerSpec} = require('../docs/swagger')
import logger from './logger';

const PORT = process.env.PORT || 8080;

//Swagger Init
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Global - HealthCheck API
app.get('/', (req, res) => {
  const start = process.hrtime(); 
  const end = process.hrtime(start);
  const responseTime = (end[0] * 1e9 + end[1]) / 1e6; 

  res.status(200).json({
    status: 'UP',
    message: 'Server is running smoothly!!',
    responseTime: `${responseTime.toFixed(2)} ms`, 
    timestamp: new Date().toISOString(),
  });
});


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

