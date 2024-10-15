# SmartNorte (frontend)

Una aplicación móvil que permite la interacción con agentes basados en un modelo de lenguaje de gran tamaño (Large Language Model).

## Descripción General

SmartNorte (Front) es una aplicación móvil desarrollada con React Native y Expo Go. Permite a los usuarios interactuar con agentes impulsados por un modelo de lenguaje avanzado, ofreciendo una experiencia conversacional de alta calidad. Además, integra la tecnología de Whisper para el reconocimiento de voz, facilitando la transcripción de audio a texto y permitiendo interacciones más naturales.

### Características Principales

- Interacción con agentes inteligentes: Comunícate con agentes basados en modelos de lenguaje de última generación para obtener respuestas y asistencia en tiempo real.
- Reconocimiento de voz con Whisper: Graba audio y convierte tu voz en texto utilizando la tecnología de Whisper, mejorando la accesibilidad y usabilidad.
- Interfaz de usuario intuitiva: Diseñada para ofrecer una experiencia fluida y amigable.
- Compatibilidad multiplataforma: Funciona en dispositivos iOS y Android gracias a React Native y Expo Go.

### Tecnologías Utilizadas

- React Native: Framework para el desarrollo de aplicaciones móviles nativas utilizando JavaScript y React.
- Expo Go: Plataforma que simplifica el desarrollo y prueba de aplicaciones React Native.
- OpenAI Whisper: Modelo de reconocimiento de voz para transcripción de audio a texto.

### Instalación

Sigue las instrucciones de instalación proporcionadas en el repositorio para configurar y ejecutar la aplicación en tu entorno local.

1. Clonar el repositorio:
```bash
git clone https://github.com/jorge-jrzz/maya_front.git
```

2. Instalar dependencias:
```bash
cd maya_front
npm install
```
3. Configurar variables de entorno:
- Crea un archivo .env en la raíz del proyecto.
- Agrega tus claves y configuraciones necesarias, como la clave de API de OpenAI.

4.	Iniciar la aplicación:
   ```bash
   npx expo prebuild --platform ios
   ```

   ```bash
   npx expo run:ios
   ```