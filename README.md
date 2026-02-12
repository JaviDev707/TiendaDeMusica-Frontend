# 🎸 Tienda de Música Fullstack - React & Spring Boot

Bienvenido a mi proyecto de E-commerce de una Tienda de Música. Esta es una aplicación **Fullstack** real que gestiona el ciclo completo de venta, desde la autenticación de usuarios hasta la gestión de stock y pedidos en el servidor.

---

## 🚀 Tecnologías Utilizadas

### Frontend
* **React 18** (Vite)
* **Context API** (Gestión de estado global: Auth, Carrito, Notificaciones)
* **Material UI (MUI)** (Componentes y diseño profesional)
* **Axios** (Comunicación con la API y gestión de interceptores)
* **React Router DOM** (Navegación dinámica)

### Backend (Repositorio vinculado)
* **Java 17 / Spring Boot**
* **Spring Security & JWT** 
* **Spring Data JPA / Hibernate**
* **MySQL** 

---

## 🌟 Características Principales

### 1. Gestión de Identidad (Auth)
* **Registro de Usuario:** Formulario completo con validaciones y creación de cuenta.
* **Autenticación JWT:** Login persistente mediante `localStorage` y `AuthContext`.
* **Cierre de Sesión:** Limpieza de estado y notificaciones de salida.

### 2. Catálogo Dinámico
* **Acceso Público:** Los visitantes pueden navegar por los productos sin estar registrados.
* **Búsqueda Avanzada:** Filtrado de productos por texto en tiempo real.

### 3. Flujo de Carrito de Compras
* **Sincronización:** Carrito gestionado en tiempo real mediante `CartContext`.
* **Persistencia en DB:** El carrito se guarda en la base de datos para usuarios registrados.
* **Checkout (Pedido):** Proceso de compra con validación de stock en el backend y vaciado automático del carrito.

### 4. Perfil de Usuario e Historial
* **Datos Personales:** Visualización de información del usuario.
* **Historial de Pedidos:** Listado de compras realizadas agrupadas en tarjetas responsivas mediante **CSS Grid**.

---

## 🛠️ Arquitectura del Frontend

La aplicación utiliza una arquitectura de **Proveedores de Contexto** para asegurar que la información fluya de manera eficiente:

1.  **NotificationProvider:** Servicio global de alertas (Snackbars) para feedback de usuario.
2.  **AuthProvider:** Controla la identidad y el acceso a rutas privadas.
3.  **CartProvider:** Maneja la lógica de compra y comunicación con la API de pedidos.

---

Desarrollado por JaviDev707 - 2026
