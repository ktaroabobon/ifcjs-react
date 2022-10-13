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
	cp .env.sample .env.development
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
	export $$(cat .env.development) > /dev/null; $(MAKE) build ENVIRONMENT=development VITE_OPTS='--sourcemap'

build/development/watch:
	$(MAKE) build/development VITE_OPTS='--watch --sourcemap'

build/serve:
	export $$(cat .env.development) > /dev/null; yarn run vite serve --host 0.0.0.0

fmt:
ifneq (,$(CI))
	yarn run prettier . --check
else
	yarn run prettier . --write
endif

lint:
	yarn run eslint src

typecheck: TSC_OPTS=
typecheck:
	yarn run tsc --noEmit $(TSC_OPTS)

test/ci:
	$(MAKE) lint
	$(MAKE) typecheck
	$(MAKE) fmt
