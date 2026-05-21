# Forum TPSIT - Backend FastAPI in Docker

Progetto backend minimale in Python usando FastAPI, confezionato in un container Docker.

Prerequisiti
- Docker installato
- (opzionale) `docker-compose`

Esecuzione

Build con Docker:

```powershell
docker build -t forum-tpsit .
docker run -p 8000:8000 forum-tpsit
```

Con docker-compose:

```powershell
docker-compose up --build
```

Endpoint principali
- `GET /` : messaggio di benvenuto
- `GET /items` : lista di item di esempio
- `POST /items` : crea un item (body JSON)

Sviluppo
- Modificare il codice in `app/` e rilanciare i container come necessario.
# forum_TPSIT