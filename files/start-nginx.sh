#!/usr/bin/env bash

# fetching env from vault file.
if test -d /var/run/secrets/nais.io/vault;
then
    for FILE in /var/run/secrets/nais.io/vault/*.env
    do
        for line in $(cat ${FILE}); do
            echo "Startup: exporting `echo ${line} | cut -d '=' -f 1`"
            export ${line}
        done
    done
fi

if test -d /apigw/sporenstreks;
then
  export API_GW_API_KEY=$(cat /apigw/sporenstreks/x-nav-apiKey)
fi

# Setting default environment variables
#export APP_DIR="/app"
#export APP_PATH_PREFIX="/nettrefusjon"
#export APP_PORT="8080"
#export API_GW_API_KEY="${API_GW_API_KEY:-dummykey}"
#export API_GATEWAY="${API_GATEWAY:-http://localhost:8080}"
#export RESOLVER=$(cat /etc/resolv.conf | grep -v '^#' | grep -m 1 nameserver | awk '{print $2}') # Picking the first nameserver.

export APP_HOSTNAME="${HOSTNAME:-localhost}"
export APP_PORT="${APP_PORT:-9000}"
export APP_NAME="${APP_NAME:-devimg}"
export APP_VERSION="${APP_VERSION:-localhost}"
export API_GW_API_KEY="tull"
export API_GATEWAY=""

echo "API Gateway='${API_GATEWAY}'"
echo "API Gateway key='${API_GW_API_KEY}'"
echo "RESOLVER='${RESOLVER}'"
echo "APP_DIR='${APP_DIR}'"
echo "APP_PATH_PREFIX='${APP_PATH_PREFIX}'"
echo "APP_PORT='${APP_PORT}'"

#echo -e "Startup:" ${APP_PATH_PREFIX} \n"

# replace env for nginx conf
envsubst '$APP_NAME $API_GW_API_KEY $APP_VERSION $APP_HOSTNAME $APP_PORT $APP_PATH_PREFIX $API_GATEWAY $RESOLVER' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/default.conf

echo "### Nginx conf ###"
cat /etc/nginx/conf.d/default.conf
echo

# replace above envs
#echo "Startup inject envs: " ${SUBS}
#for f in `find /${APP_DIR} -regex ".*\.\(js\|css\|html\|json\|map\)"`; do envsubst "$SUBS" < $f > $f.tmp; mv $f.tmp $f; done
#for f in `find /nginx -regex ".*\.nginx"`; do envsubst "$SUBS" < $f > $f.tmp; mv $f.tmp $f; done
nginx -g "daemon off;" &
pid=$!
wait "$pid"