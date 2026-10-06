# 🎮 TRIKI

Aplicación móvil de **Triki (Tic-Tac-Toe)** desarrollada con **React Native** y **Expo**.

El proyecto está pensado para ejecutarse en Android, iOS y Web mediante Expo.

## 🚀 Tecnologías

- Expo SDK 57
- React 19
- React Native 0.86
- JavaScript
- ESLint

## 📋 Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- npm
- Expo Go en tu dispositivo móvil, si deseas probar la aplicación desde el celular

## 📦 Instalación

Clona el repositorio:

```bash
git clone <URL-DEL-REPOSITORIO>
cd triki
```

Instala las dependencias:

```bash
npm install
```

## ▶️ Ejecutar el proyecto

Inicia el servidor de desarrollo:

```bash
npm start
```

También puedes iniciar directamente una plataforma:

```bash
npm run android
npm run ios
npm run web
```

Al ejecutar Expo, podrás abrir la aplicación desde un emulador, navegador o escaneando el código QR con Expo Go cuando sea compatible.

## 🧹 Verificación del código

Para ejecutar ESLint:

```bash
npm run lint
```

## 📁 Estructura principal

```text
TRIKI/
├── assets/
├── src/
│   └── Game.jsx
├── App.js
├── app.json
├── index.js
├── eslint.config.js
├── package.json
└── README.md
```

### Archivos principales

- **`index.js`**: registra el componente raíz de la aplicación con Expo.
- **`App.js`**: carga la barra de estado y el componente principal `Game`.
- **`src/Game.jsx`**: contiene la lógica/interfaz principal del juego.
- **`app.json`**: contiene la configuración de Expo para Android, iOS y Web.
- **`eslint.config.js`**: configuración de ESLint para el proyecto.

## 📱 Configuración de la aplicación

- Nombre: **TRIKI**
- Versión: **1.0.0**
- Orientación: **vertical (portrait)**
- Compatible con Android, iOS y Web
- Soporte para iPad habilitado

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia Expo |
| `npm run android` | Abre el proyecto para Android |
| `npm run ios` | Abre el proyecto para iOS |
| `npm run web` | Ejecuta la versión Web |
| `npm run lint` | Revisa el código con ESLint |

## 📄 Licencia

El proyecto incluye un archivo `LICENSE` bajo los términos de la licencia MIT.

---

Desarrollado como proyecto de práctica con **React Native + Expo**.
