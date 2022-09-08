DIST=dist

.PHONY: help gen init

help:
	cat Makefile

$(DIST):
	@mkdir $(DIST)

setup:
ifneq (,$(CI))
	yarn install --frozen-lockfile
else
	yarn install
endif

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
ifneq (,$(CI))
	yarn run prettier . --check
else
	yarn run prettier . --write
endif

lint:
	yarn run eslint .

typecheck: TSC_OPTS=
typecheck:
	yarn run tsc --noEmit $(TSC_OPTS)

deploy:
	$(MAKE) clean
	$(MAKE) fmt
	$(MAKE) build
	bash deploy.sh
