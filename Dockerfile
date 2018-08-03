FROM nginx:latest                 

COPY nginx/conf /etc/nginx/conf.d/templates/
COPY web /var/www/html/web/

CMD ["/bin/bash", "-c", "envsubst '$NGINX_HOST $NGINX_PORT' < /etc/nginx/conf.d/templates/redballoon-web.template > /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
