DIST=dist

.PHONY: help gen init

help:
	cat Makefile

$(DIST):
	@mkdir $(DIST)

setup:
	yarn install

add:
	yarn add $(package)

clean:
	-rm -rf $(DIST)

build: ENVIRONMENT=development
build: VITE_OPTS=
build:
	yarn run vite build $(VITE_OPTS) -m $(ENVIRONMENT)

build/development: VITE_OPTS=--sourcemap
build/development:
	$(MAKE) build ENVIRONMENT=development VITE_OPTS='--sourcemap'

build/development/watch:
	$(MAKE) build/development VITE_OPTS='--watch --sourcemap'

build/serve:
	yarn run vite serve

fmt:
	yarn run prettier --write .

deploy:
	$(MAKE) clean
	$(MAKE) fmt
	$(MAKE) build
	bash deploy.sh