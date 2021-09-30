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
export APIGW_API_KEY="emptyApiKey"
if test -d /apigw/sporenstreks;
then
  export APIGW_API_KEY=$(cat /apigw/sporenstreks/x-nav-apiKey)
fi
# API_GATEWAY må komme inn som env variabel
export API_GATEWAY="${API_GATEWAY:-http://localhost}"

#      - kvPath: apikey/apigw/dev/sporenstreks/sporenstreks-frontend_q1
#        mountPath: /apigw/sporenstreks
#By convention blir nøkkelen lagret i vault på stien
#/apikey/apigw/$ENV/$API/$CONSUMER

echo "### Nginx - replacing variables in config file and creates default.conf ###"
envsubst '$APIGW_API_KEY  $API_GATEWAY' < /etc/nginx/conf.d/sporenstreks.conf.template > /etc/nginx/conf.d/default.conf


echo "### Nginx - displaying the config to use ###"
cat /etc/nginx/conf.d/default.conf
echo

nginx -g "daemon off;" &
pid=$!
wait "$pid"
