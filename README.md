# Light-it Challenge

## Autor

**Tomás Marenco**

---

## Aclaraciones

### Notificaciones vía mail

Para el envío de notificaciones al registrar un paciente, utilicé **Mailtrap**. Sin embargo, este servicio solo me permitió enviar correos a mi propio email (el propietario de la cuenta de Mailtrap). Esto se debe a que para enviar correos de prueba a los emails de los pacientes registrados, era necesario tener un dominio propio, lo cual no tenía disponible.

A pesar de esto, la funcionalidad de notificaciones está completamente integrada. Cada vez que se registra un paciente, se envía una notificación a mi correo, demostrando que el flujo está funcionando correctamente.

### Imágenes

Soy consciente de que la solución actual para manejar imágenes no es la más escalable ni adecuada para una aplicación con un tráfico elevado. Por simplicidad y para cumplir con los tiempos, decidí implementar una solución local. Sin embargo, en un proyecto más grande, almacenaría las imágenes en un servicio externo dedicado, como:

- [Amazon S3]
- [Cloudinary]
- [Google Cloud Storage]
- [Firebase Storage]

---

## Instrucciones para levantar el proyecto

```bash
cd dockerfiles
docker-compose up
```

---

## Tecnologías utilizadas

- **Frontend**: React
- **Backend**: Node.js con Express
- **Base de datos**: MySQL
- **Manejo de imágenes**: Local
- **Notificaciones**: Mailtrap
- **Contenerización**: Docker y Docker Compose

---

Muchas gracias
