# AnalogCam - Tienda de Cámaras Analógicas

- Catálogo de productos con dos categorías (SLR y Compactas)
- Carrito de compras con gestión de cantidades
- Sistema de autenticación con rutas protegidas
- Panel de administración completo (CREATE, READ, UPDATE, DELETE)
- Búsqueda de productos en tiempo real
- Paginación de catálogo
- Subida de imágenes a ImgBB
- Interfaz responsiva y accesible (ARIA)
- SEO optimizado con React Helmet

## Credenciales de Administrador

Para acceder al panel de administración:
- Usuario: `admin`
- Contraseña: `1234`

## APIs Utilizadas

- MockAPI: https://693079df778bbf9e00718e45.mockapi.io/products
- ImgBB: Para almacenamiento de imágenes de productos

## Rutas Principales

- `/` - Catálogo de todos los productos
- `/category/SLR` - Cámaras SLR
- `/category/Compactas` - Cámaras Compactas
- `/detail/:id` - Detalle de producto
- `/carrito` - Carrito de compras
- `/login` - Inicio de sesión
- `/admin` - Formulario para agregar productos (protegido)
- `/admin/products` - Listado de productos para administración (protegido)
- `/admin/edit/:id` - Editar producto (protegido)

## Estructura de Carpetas

```
frontend/
├── src/
│   ├── components/
│   │   ├── adminComponents/
│   │   ├── Cart/
│   │   ├── Header/
│   │   ├── Nav/
│   │   ├── ItemList/
│   │   ├── ItemDetail/
│   │   ├── SearchBar/
│   │   ├── Pagination/
│   │   └── RutaProtegida/
│   ├── context/
│   │   ├── CartContext/
│   │   └── AuthContext/
│   ├── services/
│   │   ├── products.js
│   │   └── uploadImage.js
│   ├── utils/
│   │   └── validateProducts.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── data/
│   ├── images/
│   ├── logo.png
│   └── icon.png
└── package.json
```

