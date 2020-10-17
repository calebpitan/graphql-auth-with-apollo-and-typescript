require('dotenv').config()

const PORT = process.env.PORT || 7000
const { app, server } = require('./app/index')

app.listen(PORT, () => console.log(`Server running at ${server.graphqlPath} on port ${PORT}`))
