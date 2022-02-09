######################################
# Start envoy proxy
######################################
FROM envoyproxy/envoy:v1.20.0
COPY envoy/envoy.yaml /etc/envoy/envoy.yaml
CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml -l trace --log-path /tmp/envoy_info.log