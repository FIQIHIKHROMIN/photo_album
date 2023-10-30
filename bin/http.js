require("dotenv").config()

const app = require("../app")
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.info(`Server sedang berjalan di http://localhost:${PORT}`);
})