# API
Esta es una API para gestionar el registro de adquisiciones de bienes o servicios, creada con .NET Core 8.0 y utilizando SQLServer como base de datos.

# Requisitos
1. .NET SDK 8.0
2. SQLServer

## Configuración del Proyecto

### Estructura del Proyecto

- **Controllers**
  - `AdquisicionController.cs`
- **Data**
  - `AdquisicionDbContext.cs`
- **Models**
  - `Adquisicion.cs`

### Archivos Clave

- `Program.cs`
- `appsettings.json`

## Instalación y Ejecución

### Clonar el Repositorio

Gitbash
git clone https://github.com/jaojedat/PruebaADRES.git
cd API 

### CONFIGURAR LA BASE DE DATOS
Instala los paquetes necesarios:
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools

CREAR Y APLICAR MIGRACIONES
Crear una migración inicial y aplicar las migraciones a la base de datos:
- dotnet ef migrations add InitialCreate
- dotnet ef database update

EJECUTAR LA APLICACION
Ejecuta la aplicación con el siguiente comando:
- dotnet watch run


USO DE SWAGGER
Swagger está configurado para el entorno de desarrollo. al ejecutar la aplicación, abrira la interfaz de swagger donde estan documentadas la API y su uso de prueba.
