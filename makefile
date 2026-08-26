setup-dev:
	npm install
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local; \
		echo "Created .env.local, fill it in, then run 'make start-dev'."; \
	fi

start-dev:
	make migrate
	npm i
	npm run dev

push:
	@echo "Enter your commit message:"
	@read commit_message; \
	current_branch=$$(git rev-parse --abbrev-ref HEAD); \
	git add .; \
	git commit -m "$$commit_message"; \
	git push origin $$current_branch

migration:
	@echo "Migration name:"
	@read migration_name;\
	npx drizzle-kit generate --name $$migration_name

migrate:
	npx drizzle-kit migrate