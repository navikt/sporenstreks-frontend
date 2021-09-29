#!/usr/bin/env bash
set -e

echo "### Nginx conf ###"
cat /etc/nginx/conf.d/default.conf
echo

export API_GW_API_KEY=""

nginx -g "daemon off;" &
pid=$!
wait "$pid"
