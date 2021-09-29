
FROM nginxinc/nginx-unprivileged:1.21.3-alpine


ADD files/proxy.nginx /etc/nginx/conf.d/app.conf.template

ADD files/start-nginx.sh       /start-nginx.sh

ENV APP_DIR="/app" \
  APP_PATH_PREFIX="/nettrefusjon" \
  APP_CALLBACK_PATH="/k9/sak/cb" \
  APP_URL_SAK="http://k9-sak"

COPY build /etc/nginx/html

EXPOSE 9000

CMD sh /start-nginx.sh
