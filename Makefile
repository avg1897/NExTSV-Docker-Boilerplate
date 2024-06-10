start:
	docker-compose up -d

stop:
	docker-compose stop

build:
	docker-compose up -d --build

dev:
	cd frontend; npm run dev;

build_frontend:
	cd frontend; npm run build;