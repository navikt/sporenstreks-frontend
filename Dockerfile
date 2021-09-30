FROM nginxinc/nginx-unprivileged

ENV NGINX_ENVSUBST_OUTPUT_DIR /tmp

COPY nginx-conf-overwrite.conf /etc/nginx/conf.d/default.conf

COPY build /etc/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

COPY 20-envsubst-on-templates.sh /docker-entrypoint.d/
