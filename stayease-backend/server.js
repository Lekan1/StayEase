require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Register Routes
fastify.register(require('./routes/authRoutes'), { prefix: '/api/auth' });
fastify.register(require('./routes/userRoutes'), { prefix: '/api/users' });
fastify.register(require('./routes/propertyRoutes'), { prefix: '/api/properties' });
fastify.register(require('./routes/bookingRoutes'), { prefix: '/api/bookings' });
fastify.register(require('./routes/adminRoutes'), { prefix: '/api/admin' });

// Default route
fastify.get('/', async (request, reply) => {
  return { message: 'StayEase API is running 🚀' };
});

// Error Handling Middleware
fastify.setErrorHandler(require('./middlewares/errorHandler'));

// Start Server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' });
    fastify.log.info(`Server running`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
