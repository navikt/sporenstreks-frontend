FROM nginxinc/nginx-unprivileged

# Copying over the config-files.
COPY files/default-config.nginx /etc/nginx/conf.d/app.conf.template
COPY files/start-nginx.sh       /usr/sbin/start-nginx

COPY build /usr/share/nginx/html

EXPOSE 8080


CMD sh /usr/sbin/start-nginx
