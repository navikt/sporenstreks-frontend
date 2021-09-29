FROM nginxinc/nginx-unprivileged


# Copying over the config-files.
COPY files/default-config.nginx /etc/nginx/conf.d/app.conf.template
# RUN chmod u+x files/start-nginx.sh
COPY files/start-nginx.sh       /usr/sbin/start-nginx

# RUN mkdir -p /nginx
COPY build /usr/share/nginx/html/

EXPOSE 8080

WORKDIR /app

CMD sh /usr/sbin/start-nginx
