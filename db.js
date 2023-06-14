const { MongoClient } = require("mongodb");

const connectionString = "mongodb+srv://maxisantoro2003:4747Maxi@cluster0.q6o6rkk.mongodb.net/";

const client = new MongoClient(connectionString);

let db; // Variable para almacenar la referencia a la base de datos

async function connect() {
  try {
    await client.connect(); // Espera a que se establezca la conexión
    db = client.db("Usuario"); // Asigna la referencia a la base de datos
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

connect(); // Llama a la función de conexión al inicio del programa

module.exports = db; // Exporta la referencia a la base de datos
