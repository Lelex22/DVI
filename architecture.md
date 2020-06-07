# DESCRIPCIÓN DEL REPOSITORIO
### Carpetas
  **assets:** Esta carpeta contiene todos los recursos necesarios para el desarrollo de los niveles, desde los mapas hasta los enemigos y sus sonidos.
  
  **slides:** Esta carpeta contiene la presentación del proyecto.
  
  **src:** Dentro de esta carpeta se encuentra el código de todo el videojuego.

### Ficheros
 _architecture.md:_ Fichero que define la estructura del proyecto. 
 
 _assets.md:_ Fichero que explica la estructura que tiene el directorio assets.
 
_GDD.md:_ Explicación detallada de proyecto(Mecánicas de juego, objetos, combate, enemigos).

 _mencionar.txt:_ Contiene los enlaces a las paginas usadas como obtención de recursos para el proyecto.
 
 _README.md:_ Descripción general del proyecto.
 
 _index.html:_ Contiene el inicio del juego.
 
### DESCRIPCIÓN DE LA ARQUITECTURA

En esta sección se van a explicar el uso de cada fichero .js.
+ coins.js: contiene la gestión de monedas de la partida.

+ dungeon-scene.js: se encarga de la gestión del mapa inicial.

+ enemy.js: contiene toda las mecánicas del ciclope.

+ escudo.js: se encarga de la gestión del escudo.

+ fireball.js: gestiona los parámetros de la bola de fuego del mago.

+ fregona.js: regula los parámetros de la fregona de Zelgui.

+ gameover.js: se encarga de inicializar las posibles opciones elegidas tras ser derrotado.

+ index.js: inicializa el juego.

+ Mago.js: este archivo contiene todo lo necesario para el uso del mago, gestiona sus movimientos, Sprite etc.

+ mapalava-scene.js: contiene todo lo necesario para el buen funcionamiento del mapa de lava.

+ mapanuevo-scene.js: ultimo mapa en añadir contiene los datos del mapa de nivel fácil.

+ mapaverde-scene.js: encontramos todo lo necesario para la gestión del mapa verde.

+ Masked.js: mantiene la jerarquía del gladiador.

+ piedra.js: contiene la creación y gestión de las piedras que lanza el ciclope.

+ player.js: en este archivo tenemos todo lo necesario para usar a Zelgui.

+ prelodad.js: en este documento podemos realizamos la precarga de todos los archivos necesarios para el videojuego, mapas, audios, objetos etc.

+ Shopscene.js: se encarga de regular la tienda que se encuentra en la dungeon.

+ smash.js: contiene lo necesario para usar el ataque a distancia del vikingo.

+ tile-mapping.js: gestiona la carga de mapas.

+ tilemap-visibility.js: gestiona el sombreado de niveles.

+ titlescreen.js: gestiona las opciones de la pantalla de inicio.

+ Viking.js: contiene las mecánicas de movimientos y ataques del vikingo y todo lo necesario para su implementación.
