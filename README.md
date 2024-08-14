# Hike And Scramble Las Vegas Tools

- To Run Locally
  - start Mongo DB as described in the section below
  - start the dev server via `npm run dev`

## Mongo DB Local Start

- start docker desktop
  - enable docker data files/volume access
  - enable file system access privileges
- run `docker ps -a`
  - if there is a stopped container run `docker start <container_id>`
  - if you are starting a new container
    - run `docker compose up`
    - run `docker exec -it <container_id> bash`
      - run `mongo`
        - execute `rs.status()`
        - execute `rs.initiate()`
        - execute `quit()`
      - run `mongorestore /mongodb/dump` restore old dump
