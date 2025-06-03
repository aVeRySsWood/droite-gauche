Projet Kubernetes — « Droite ou Gauche »
Cette application web permet aux utilisateurs de voter si une "chose" (objet, concept, personnage, etc.) est perçue comme étant de gauche ou de droite.
Le projet est basé sur un backend Node.js, une base MySQL et une interface web simple, le tout déployé avec Kubernetes via Docker Desktop.

🧱 Stack technique

Backend : Node.js + Express

Base de données : MySQL

Interface d’administration : phpMyAdmin

Orchestration : Kubernetes (via Docker Desktop)

Conteneurisation : Docker

📁 Arborescence du projet

gauche-droite-app/
├── backend/
│ ├── Dockerfile
│ ├── db_init.sql
│ ├── server.js
│ ├── package.json
│ └── public/
│ ├── index.html
│ └── script.js
├── k8s/
│ ├── secret.yaml
│ ├── mysql-initdb-configmap.yaml
│ ├── mysql-pvc.yaml
│ ├── mysql-deployment.yaml
│ ├── mysql-service.yaml
│ ├── phpmyadmin-deployment.yaml
│ ├── phpmyadmin-service.yaml
│ ├── nodeapp-deployment.yaml
│ └── nodeapp-service.yaml
└── README.md

⚙️ Prérequis

Docker Desktop installé avec Kubernetes activé

kubectl installé et pointant vers le contexte docker-desktop

✅ Instructions de déploiement

Ouvrir Docker Desktop et activer Kubernetes (Settings > Kubernetes > Enable Kubernetes)

Ouvrir un terminal PowerShell dans le dossier racine du projet

Construire l’image Docker du backend :

cd backend
docker build -t gauche-droite-api:latest .

S’assurer que l’image est bien présente :

docker images

(Important) Ajouter imagePullPolicy: Never dans nodeapp-deployment.yaml :

image: gauche-droite-api:latest
imagePullPolicy: Never

Appliquer les fichiers YAML Kubernetes :

kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/mysql-initdb-configmap.yaml
kubectl apply -f k8s/mysql-pvc.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/mysql-service.yaml
kubectl apply -f k8s/phpmyadmin-deployment.yaml
kubectl apply -f k8s/phpmyadmin-service.yaml
kubectl apply -f k8s/nodeapp-deployment.yaml
kubectl apply -f k8s/nodeapp-service.yaml

Vérifier que tous les pods sont bien Running :

kubectl get pods

🧪 Accéder à l’application

Interface utilisateur : http://localhost:30002

phpMyAdmin : http://localhost:30001

Identifiants pour phpMyAdmin :

hôte : mysql

utilisateur : root

mot de passe : root

🛠️ Fonctions de l'application

Ajouter une "chose"

Voter "Gauche" ou "Droite"

Consulter le total des votes pour chaque chose

📦 Fonctionnement technique

L’API est accessible via /api/things

La base MySQL est initialisée avec un script (ConfigMap)

Les conteneurs communiquent via Services internes

Les données sont persistées dans un PVC (volume MySQL)

🚧 À améliorer (idées futures)

Authentification des utilisateurs

Interface plus avancée en React

Historique des votes

Déploiement dans un cluster distant (GKE, AKS, etc.)