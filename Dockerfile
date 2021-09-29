FROM nginxinc/nginx-unprivileged

# User env var is needed for luarocks to not complain.
ENV APP_DIR="/app" \
	APP_PATH_PREFIX="/nettrefusjon" \
	USER="root" \
	APP_PORT="8080"

# Copying over the config-files.
COPY files/default-config.nginx /etc/nginx/conf.d/app.conf.template
# RUN chmod u+x files/start-nginx.sh
COPY files/start-nginx.sh       /usr/sbin/start-nginx

# RUN mkdir -p /nginx
COPY build /app

EXPOSE 8080

WORKDIR /app

CMD sh /usr/sbin/start-nginx
