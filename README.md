# El Ahorcado 

## Descripción
Este proyecto es una implementación del clásico juego "El Ahorcado" (Hangman) utilizando HTML, CSS y JavaScript. El juego permite a los jugadores adivinar una palabra letra por letra, con un límite de intentos antes de perder. Además, el juego guarda y muestra las puntuaciones de los jugadores utilizando Supabase.

## Características
- Selección aleatoria de palabras
- Interfaz de usuario interactiva
- Sistema de puntuación
- Almacenamiento de puntuaciones altas usando Supabase
- Diseño responsivo para dispositivos móviles

## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:
- `index.html`: Archivo principal que contiene la estructura HTML del juego.
- `styles.css`: Archivo de estilos CSS para el diseño del juego.
- `js/main.js`: Lógica principal del juego.
- `js/score.js`: Manejo de puntuaciones y comunicación con Supabase.
- `js/supabaseClient.js`: Inicialización del cliente de Supabase.

## Requisitos
- Un navegador web moderno.
- Conexión a internet para obtener palabras aleatorias y guardar puntuaciones en Supabase.

## Instalación
1. Clona el repositorio en tu máquina local:
   ```
   https://github.com/Celiz/ahorcado-game.git
   ```
2. Navega al directorio del proyecto:
   ```
   cd ahorcado-game
   ```
3. Abre el archivo `index.html` en tu navegador.

## Uso
1. Al cargar la página, se te pedirá que ingreses tu nombre.
2. El juego seleccionará una palabra aleatoria y mostrará guiones bajos para cada letra.
3. Haz clic en las letras para adivinar la palabra.
4. Cada letra correcta aumentará tu puntuación.
5. Si completas la palabra, recibirás un bono de puntuación.
6. Si alcanzas el número máximo de intentos, perderás el juego y se mostrará la palabra correcta.
7. Las puntuaciones se guardarán y se mostrarán en la tabla de puntuaciones.

## Archivos Principales
- `index.html`: Contiene la estructura HTML del juego, incluyendo el contenedor del juego y el contenedor de puntuaciones.
- `styles.css`: Define los estilos para el diseño del juego, incluyendo el diseño responsivo para dispositivos móviles.
- `js/main.js`: Contiene la lógica principal del juego, incluyendo la inicialización del juego, manejo de adivinanzas y actualización de la interfaz de usuario.
- `js/score.js`: Maneja las puntuaciones de los jugadores, incluyendo la inicialización del jugador, actualización de puntuaciones y obtención de las mejores puntuaciones desde Supabase.
- `js/supabaseClient.js`: Inicializa el cliente de Supabase para la comunicación con la base de datos.

## Dependencias
- [Supabase](https://supabase.io/): Utilizado para guardar y obtener puntuaciones de los jugadores.

## Configuración de Supabase
Para utilizar Supabase en este proyecto:
1. Crea una cuenta en [Supabase](https://supabase.io/).
2. Crea un nuevo proyecto en Supabase.
3. Obtén la URL de tu proyecto y la clave API anónima.
4. Actualiza el archivo `js/supabaseClient.js` con tus credenciales.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

