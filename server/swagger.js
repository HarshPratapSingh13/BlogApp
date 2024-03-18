import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog App',
            version: '1.0.0',
            description: 'API documentation for your Express application',
        },
    },
    apis: ['./routes/*.js'], // Point to the directory containing your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;