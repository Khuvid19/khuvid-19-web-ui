FROM nginx:1.17.10-alpine

ENV TZ="Asia/Seoul"

RUN sed -i "s|user  nginx;|user  root;|g" /etc/nginx/nginx.conf

RUN echo -e \
"server {\n" \
"  listen 80;\n" \
"  server_name localhost;\n" \
"  location / {\n" \
"    root /usr/share/nginx/html;\n" \
"    index index.html;\n" \
"    try_files \$uri \$uri/ /index.html;\n" \
"  }\n" \
"  location /files/ {\n" \
"    alias /data/files/;\n" \
"  }\n" \
"}" > /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/

COPY dist/ /usr/share/nginx/html/
