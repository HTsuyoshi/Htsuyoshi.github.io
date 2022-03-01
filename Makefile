.PHONY: start build
start: build
	docker container run --rm -p 8080:80 --name personal_website personal_website:1.0

build:
	docker image build -t personal_website:1.0 .

.PHONY: stop clean
clean: stop
	docker image rm personal_website:1.0 2>&- || true

stop:
	docker container stop personal_website 2>&- || true
	docker container rm personal_website 2>&- || true

.PHONY: debug
debug: build
	docker container run --rm -ti -p 8080:80 --name personal_website --entrypoint /bin/bash personal_website:1.0
