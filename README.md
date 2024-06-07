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