# TP3

## Exo 1

Le but de cet exercise est de créer votre premier docker compose. Ce docker compose nous permettra de mettre en place un wordpress.

Dans un premier temps, nous allons définir nos services et nos images. Nous aurons besoin de deux services :
- un service wordpress avec comme image : wordpress:latest
- un service db (notre base de donnée) avec comme image : mysql:8.0

```docker
services:

  wordpress:
    image: wordpress:latest

  db:
    image: mysql:8.0

```

Nous allons maintenant rajouter une politique de redémarrage afin de s'assurer que les conteneurs se relance en cas de crash / probleme. Pour se faire, nous allons rajouter l'instruction restart: always

```docker
services:

  wordpress:
    image: wordpress:latest
    restart: always

  db:
    image: mysql:8.0
    restart: always

```

A l'aide de l'instruction port, nous allons permettre à notre application d'être accessible depuis l'exterieur sur le port 8080

```docker
services:

  wordpress:
    image: wordpress:latest
    restart: always
    ports:
      - 8080:80

  db:
    image: mysql:8.0
    restart: always
```

Wordpress et MySQL ont besoin tous les deux d'information pour s'executer. Grace aux variables d'environnement, nous allons leur donner ces informations. L'instruction environment va nous permettre de set à l'interieur du conteneur un jeu de variable d'environnement

```
services:

  wordpress:
    image: wordpress
    restart: always
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb

  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
```

Il nous reste plus qu'a creer nos volumes de sauvegarde et notre docker compose sera terminé.

Dans un premier temps, au meme niveau que service, nous allons creer nos volumes (un volume db pour notre bdd et un volume wordpress pour wordpress)

```
services:

  wordpress:
    image: wordpress
    restart: always
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb

  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_RANDOM_ROOT_PASSWORD: '1'

volumes:
  wordpress:
  db:
```

Dans un second temps, nous allons, dans chaque service, faire le mappage entre notre volume et le repertoire à sauvegarder dans le conteneur grace à l'instruction volumes

```
services:

  wordpress:
    image: wordpress
    restart: always
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb
    volumes:
      - wordpress:/var/www/html

  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
    volumes:
      - db:/var/lib/mysql

volumes:
  wordpress:
  db:
```

La commande suivante va vous permettre de lancer / arreter votre docker compose:

```
docker compose -f lienversdockercompose up/down
```

## Exo 2

Le but de cet exercice est de créer un docker compose réutilisant une image build à partir d'un Dockerfile. 

Votre docker compose devra se composer de deux services:
- db avec une image mysql:latest
- app qui build et recupère l'image générée par votre Dockerfile

Votre service db devra:
- generer un conteneur qui aura pour nom db
- les variables d'environnement "MYSQL_ROOT_PASSWORD: root" et "MYSQL_DATABASE: test" devront être défini
- vous devrez creer le volume db-save et le mapper sur le chemin /var/lib/mysql
- toujours redemarrer

Votre service app devra:
- avoir le port 3000 exposé
- dependre de db
- redémarrer uniquement si le conteneur n'a pas été stoppé

Vos deux services devront etre sur le même reseau. Le nom du réseau sera rs_1