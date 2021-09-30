#!/usr/bin/env bash
set -e

#echo "### Vault - exporting variabels as environment variables ###"
#if test -d /var/run/secrets/nais.io/vault;
#then
#    for FILE in /var/run/secrets/nais.io/vault/*.env
#    do
#        for line in $(cat ${FILE}); do
#            echo "Startup: exporting `echo ${line} | cut -d '=' -f 1`"
#            export ${line}
#        done
#    done
#fi


echo "### API Gateway ###"
export GATEWAY_KEY="emptyApiKey"
#if test -d /apigw/sporenstreks;
#then
#  export APIGW_API_KEY=$(cat /apigw/sporenstreks/x-nav-apiKey)
#fi
# API_GATEWAY må komme inn som env variabel
export GATEWAY_URL="http://localhost/"


echo "### Nginx - replacing variables in config file and creates default.conf ###"
envsubst '$GATEWAY_KEY  $GATEWAY_URL ' < /etc/nginx/conf.d/sporenstreks.conf.template > /etc/nginx/conf.d/default.conf


echo "### Nginx - displaying the config to use ###"
cat /etc/nginx/conf.d/default.conf
echo

nginx -g "daemon off;" &
pid=$!
wait "$pid"
