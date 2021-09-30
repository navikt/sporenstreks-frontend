FROM nginxinc/nginx-unprivileged:1.21.3-alpine

ADD nginx/config.nginx /etc/nginx/conf.d/sporenstreks.conf.template
ADD nginx/start.sh       /start.sh

COPY build /etc/nginx/html
EXPOSE 8080
CMD sh /start.sh
