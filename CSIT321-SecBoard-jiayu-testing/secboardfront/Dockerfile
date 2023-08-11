FROM nginx:latest
COPY ./dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY fullchain1.pem /etc/ssl/fullchain1.pem
COPY privkey1.pem /etc/ssl/privkey1.pem
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]