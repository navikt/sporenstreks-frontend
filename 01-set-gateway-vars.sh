export GATEWAY_KEY="Hello world"
export API_GATEWAY="Test"

echo "$GATEWAY_KEY is set"
nginx -g "daemon off;" &
pid=$!
wait "$pid"
