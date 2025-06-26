# Aprendiendo con personajes frontend

Este es el frotnend de aprendiendo con personajes, se conecta con una api gateway y permite crear videos de manera automática en base a un guión o tema especifico.

## Entorno de desarrollo local

### Clonar el repositorio

```bash
git clone git@github.com:reels-automation/reels-automation-frontend-new.git
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

```bash
cp .env.template .env

VITE_API_URL # La url a la api gateway ex: http://127.0.0.1:7080
```

### Ejecutar

```bash
npm run dev
```

### Buildear con node

```bash
npm run build
npm run preview
```

## Entorno de desarrollo de producción

### Docker

```yaml
services:
  frontend:
    image: ghcr.io/reels-automation/reels-automation-frontend-new:main
    ports:
      - "80:80"
    environment:
      APP_API_URL: ${APP_API_URL} 
```

Importante: Configurar las variables de entorno apropiadas en un .env

### Kuberentes

### Inyectar variables de entorno

En los proyectos que se buildean con node, las variables de entorno se "inyectan" al momento de ejecutar *npm run build*, entonces en este proyecto tuvimos que crear un script de bash llamado *env.sh* que corre cuando inicia el contenedor de docker y cambia la variable de entonro de VITE_API_URL por una variable que pasemos en el entorno de docker. Esto permite que más flexibilidad puesto que las imágenes no dependen de un entorno de desarrollo especifico.
