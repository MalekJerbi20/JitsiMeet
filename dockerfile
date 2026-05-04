# 1. Image de base officielle Jitsi Web
FROM jitsi/web:unstable

# 2. Passer en root pour copier des fichiers
USER root

# 3. Copier ton frontend modifié
# 👉 adapte le chemin selon ton projet local
COPY ./JitsiMeet /usr/share/JitsiMeet

# 4. Fixer les permissions (important pour Jitsi)
RUN chown -R www-data:www-data /usr/share/JitsiMeet

# 5. Revenir à l’utilisateur utilisé par Jitsi
USER www-data

# 6. Exposer les ports (déjà défini dans l’image de base)
EXPOSE 80 443
