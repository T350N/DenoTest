import { Hono } from "jsr:@hono/hono";
import mssql from "npm:mssql";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

const app = new Hono();

// Configuración de conexión a la base de datos
const sqlConfig = {
  user: Deno.env.get("DB_USER") || "",
  password: Deno.env.get("DB_PASSWORD") || "",
  server: Deno.env.get("DB_SERVER") || "",
  database: Deno.env.get("DB_DATABASE") || "",
  port: parseInt(Deno.env.get("DB_PORT") || "1433"),
  options: {
    trustServerCertificate: true,
  },
  connectionTimeout: 60000, // 60 segundos
  requestTimeout: 60000, // 60 segundos
};

// Ruta GET para obtener usuarios
app.get("/api/users", async (c) => {
  try {
    // Establecer la conexión dentro de la ruta para manejar errores individuales.
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Usuarios");
    pool.close(); // Cerrar la conexión después de la consulta.
    return c.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return c.json({ error: "Error al obtener usuarios" }, 500); // Devolver un error 500
  }
});

Deno.serve({ port: 3000, handler: app.fetch });

console.log("Hello, we are using port 3000, enjoy it!");