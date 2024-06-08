# Server side code in NODE JS
1. Routes
2. Middlewares
3. Environment Variables
4. MongoDB models

## Mongo DB Connection
```
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database Connected."))
.catch(error => console.log(error))
```

## Error Handling
1. Route not found 
    ```
    app.use((req, res, next) => {
        const error = new Error(`Not found: ${req.originalUrl}`);
        error.status(404);
        next(error);
    })
    ```
2. Error handling middleware
    ```
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            error: {
                message: err.message
            }
        });
    });
    ```