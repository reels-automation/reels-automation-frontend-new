#!/bin/sh

cat <<EOF > /usr/share/nginx/html/config.json
{
  "API_URL": "${VITE_API_URL}"
}
EOF

echo "Generated config.json:"
cat /usr/share/nginx/html/config.json

# Start nginx
exec nginx -g 'daemon off;'
