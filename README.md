# Back-end proyect for Coderhouse commision 31000

 Fernando Diaz

### Descripcion
  Backend de prueba para un e-Commerce, desarrollado en NodeJS con Express para la configuracion del servidor, MongoDB (atlas) para la base de datos, EJS como motor
de plantillas para generar las vistas necesarias para poder probar la aplicacion y socket.io para generar conexiones bilaterales para el chat.
Para correr la app, correr el comando ```npm start``` teniendo nodemon instalado.Esto correra la app en un puerto aleatorio que este libre, para modificar esto,
hacerlo desde la variable de entorno PORT que por defecto esta en 0.

 La arquitectura esta basada en el patron de diseño Modelo Vista Controlador (MVC), para ello se ha separado en capas diferentes el enrutamiento, la logica de negocio y
la comunicacion con la base de datos.

### Navegacion

  La aplicacion presenta una vista limpia que no muestra productos estando deslogueado. En la parte superior hay un panel para loguearse o bien para registrarse, asi 
 como tambien un link a la sala de chat.
  Tanto para el registro como para el logueo de usuarios, se implemento passport local.
  
  Para tener los accesos de administrador se proporciona un usuario de prueba:
  ```
  usuario: admin@admin.com
  pass: administrador
```

El formulario de registro tiene un validador de contraseña para evaluar que tenga 8 caracteres y que sean iguales. El avatar elegido, se guarda en el entorno local, por 
que solo se mostraran aquellas imagenes de los usuarios creados en esa computadora, si no encuentra nada muestra un avatar por defecto.
Una vez logueado, la sesion dura 6 minutos, tiempo que se puede configurar desde las variables de entorno (SESSION_TIME_LIMIT)

Luego hay un panel de administrador, al cual se accede desde la barra de navegacion, siempre y cuando el usuario logueado sea administrador. Desde alli se pueden agregar
productos, eliminar o modificar.

Si se modifica un solo campo de un producto, el resto los mantiene como esta.

Por otro lado cualquier usuario puede agregar productos a su carrito y luego puede acceder al mismo desde la barra de navegacion. Alli se mostraran los productos 
agregados y la posibilidad de eliminarlos. Tambien existe la opcion de terminar la orden, a partir de lo cual se envia por correo al administrador el numero de orden
y los productos comprados. Una vez enviado, se vacia el carrito.

Para el envio de mail, se utilizo nodemailer, configurado con una cuenta de ethereal, cuyas credenciales se encuentra en las variables de entorno.


 
 

