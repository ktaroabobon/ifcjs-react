DOCKER_COMPOSE_VERSION_CHECKER := $(shell docker compose > /dev/null 2>&1 ; echo $$?)
ifeq ($(DOCKER_COMPOSE_VERSION_CHECKER), 0)
	DOCKER_COMPOSE_IMPL=docker compose
else
	DOCKER_COMPOSE_IMPL=docker-compose
endif

DIST=dist

.PHONY: help gen init

help:
	cat Makefile

$(DIST):
	@mkdir $(DIST)

setup:
	cp .env.sample .env.development

build:
	$(MAKE) docker-compose/up-d
	$(MAKE) start/serve

install:
ifneq (,$(CI))
	yarn install --frozen-lockfile
else
	yarn install
endif

.PHONY: docker-compose/build
docker-compose/build:
	$(DOCKER_COMPOSE_IMPL) build

.PHONY: docker-compose/up
docker-compose/up:
	$(DOCKER_COMPOSE_IMPL) up

.PHONY: docker-compose/up-d
docker-compose/up-d:
	$(DOCKER_COMPOSE_IMPL) up -d

.PHONY: docker-compose/down
docker-compose/down:
	$(DOCKER_COMPOSE_IMPL) down

.PHONY: logs
logs:
	$(DOCKER_COMPOSE_IMPL) logs -f

.PHONY: docker-compose/logs
docker-compose/logs:
	$(DOCKER_COMPOSE_IMPL) logs -f

add:
	$(DOCKER_COMPOSE_IMPL) exec viewer yarn add $(package)

clean:
ifneq (,$(CI))
	-rm -rf $(DIST)
else
	$(DOCKER_COMPOSE_IMPL) exec viewer -rm -rf $(DIST)
endif

start: ENVIRONMENT=development
start: VITE_OPTS=
start:
ifneq (,$(CI))
	yarn run vite build $(VITE_OPTS) -m $(ENVIRONMENT)
else
	$(DOCKER_COMPOSE_IMPL) exec viewer yarn run vite build $(VITE_OPTS) -m $(ENVIRONMENT)
endif

start/development: VITE_OPTS=--sourcemap
start/development:
	$(DOCKER_COMPOSE_IMPL) exec viewer export $$(cat .env.development) > /dev/null; $(MAKE) start ENVIRONMENT=development VITE_OPTS='--sourcemap'

start/development/watch:
	$(MAKE) start/development VITE_OPTS='--watch --sourcemap'

start/serve:
	$(DOCKER_COMPOSE_IMPL) exec viewer export $$(cat .env.development) > /dev/null; $(DOCKER_COMPOSE_IMPL) exec viewer yarn run vite serve --host 0.0.0.0

fmt:
ifneq (,$(CI))
	yarn run prettier . --check
else
	$(DOCKER_COMPOSE_IMPL) exec viewer yarn run prettier . --write
endif

lint:
ifneq (,$(CI))
	yarn run eslint src
else
	$(DOCKER_COMPOSE_IMPL) exec viewer yarn run eslint src
endif

typecheck: TSC_OPTS=
typecheck:
ifneq (,$(CI))
	yarn run tsc --noEmit $(TSC_OPTS)
else
	$(DOCKER_COMPOSE_IMPL) exec viewer yarn run tsc --noEmit $(TSC_OPTS)
endif
