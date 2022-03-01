FROM ruby:3.0.0 as build

WORKDIR /srv

COPY ./assets/ ./assets/
COPY ./_layouts/ ./_layouts/
COPY ./pages/ ./pages/
#COPY ./Gemfile.lock ./Gemfile ./
COPY ./Gemfile ./
COPY ./index.html ./_config.yml ./

RUN [ "bundle", "update" ]
RUN [ "bundle", "install" ]
RUN [ "bundle", "exec", "jekyll", "build" ]

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /srv/_site/ ./
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
