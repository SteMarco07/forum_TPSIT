# Forum TPSIT - Backend API con Autenticazione JWT

Progetto backend completo in Python usando FastAPI, PostgreSQL e Docker Compose con autenticazione JWT per la gestione degli utenti.

## 📋 Contenuto

- **FastAPI Backend** - Server API moderno e veloce
- **PostgreSQL Database** - Database relazionale persistente
- **JWT Authentication** - Autenticazione sicura con JSON Web Tokens
- **Caddy Reverse Proxy** - Reverse proxy HTTP/HTTPS
- **Docker Compose** - Orchestrazione completa dei servizi

## 🏗️ Architettura

```
Client ↔ Caddy (80/443) ↔ FastAPI (8000) ↔ PostgreSQL (5432)
```

- **Caddy**: Reverse proxy per instradare le richieste HTTP/HTTPS
- **FastAPI**: Server Python con autenticazione JWT
- **PostgreSQL**: Database per memorizzare utenti e dati

## 📦 Servizi Docker

| Servizio | Porta | Descrizione |
|----------|-------|-------------|
| caddy | 80, 443 | Reverse proxy HTTP/HTTPS |
| app | 8000 | FastAPI backend (interno) |
| postgres | 5432 | Database PostgreSQL (interno) |

## 🚀 Quick Start

### Prerequisiti
- Docker e Docker Compose installati
- Port 80 e 443 disponibili (o modificare in docker-compose.yml)

### Avvio

```bash
# Clonare il progetto
git clone <repository>
cd forum_TPSIT

# Avviare i servizi
docker-compose up -d

# Verificare lo stato
docker-compose ps

# Visualizzare i log del backend
docker-compose logs -f app
```

### Accesso

- **API Swagger UI**: http://localhost/api/docs
- **API ReDoc**: http://localhost/api/redoc
- **API Base URL**: http://localhost/api/v1
- **Health Check**: http://localhost/health

## 🔐 Autenticazione

### Registrazione
```bash
curl -X POST http://localhost/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "johndoe",
    "password": "SecurePassword123",
    "full_name": "John Doe"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "full_name": "John Doe"
  }
}
```

### Login
```bash
curl -X POST http://localhost/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123"
  }'
```

### Richiedere Endpoint Protetto
```bash
curl -X GET http://localhost/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 📚 Endpoint Disponibili

### Auth Routes (`/api/v1/auth`)
- `POST /register` - Registrazione nuovo utente
- `POST /login` - Login utente
- `GET /me` - Profilo utente corrente
- `POST /refresh` - Rinnovare access token

### User Routes (`/api/v1/users`)
- `GET /me` - Profilo utente (autenticato)
- `PUT /me` - Aggiornare profilo
- `GET /{user_id}` - Ottenere dettagli utente
- `GET /` - Elenco utenti (paginato)

**Tutti gli endpoint `/users` richiedono autenticazione JWT**

## 🔧 Configurazione

### Variabili di Ambiente (.env)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/forum_db

# JWT
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Environment
ENVIRONMENT=development
```

⚠️ **In produzione**: Modificare `SECRET_KEY` con una chiave complessa e unica

## 🐳 Comandi Docker Compose

```bash
# Avviare i servizi
docker-compose up -d

# Fermare i servizi
docker-compose down

# Visualizzare log in tempo reale
docker-compose logs -f app

# Ricompilare il container backend (dopo modifche)
docker-compose up -d --build

# Rimuovere tutto inclusi volumi (ATTENZIONE: cancella database)
docker-compose down -v

# Verificare stato servizi
docker-compose ps
```

## 📊 Database Schema

### Tabella users

| Campo | Tipo | Descrizione |
|-------|------|-------------|
| id | INTEGER | ID primario |
| email | VARCHAR | Email univoca |
| username | VARCHAR | Username univoco |
| hashed_password | VARCHAR | Password hashata con bcrypt |
| full_name | VARCHAR | Nome completo (opzionale) |
| is_active | BOOLEAN | Stato account (default: true) |
| created_at | DATETIME | Data creazione |
| updated_at | DATETIME | Data ultimo aggiornamento |

## 🔒 Sicurezza

### ✅ Implementato
- Password hashate con bcrypt
- JWT con scadenza configurabile
- CORS configurato
- Validazione input con Pydantic
- Database separato dal client

### ⚠️ Miglioramenti per Produzione
1. Cambiare `SECRET_KEY` con valore complesso
2. Limitare CORS a domini specifici
3. Configurare HTTPS con certificati validi
4. Usare variabili d'ambiente per credenziali DB
5. Implementare rate limiting
6. Aggiungere email verification
7. Implementare refresh token rotation
8. Aggiungere logging e monitoring

## 📝 Struttura Progetto

```
forum_TPSIT/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # Entry point
│   │   ├── config.py            # Configurazione
│   │   ├── database.py          # DB setup
│   │   ├── models.py            # Schema dati
│   │   ├── routers/
│   │   │   ├── auth_router.py   # Auth endpoints
│   │   │   └── user_router.py   # User endpoints
│   │   └── utils/
│   │       └── security.py      # JWT e password utilities
│   ├── requirements.txt         # Dipendenze Python
│   └── Dockerfile
├── docker-compose.yml           # Orchestrazione servizi
├── Caddyfile                   # Config Caddy
├── .env                         # Variabili d'ambiente
├── .gitignore
├── API_DOCUMENTATION.md         # Documentazione API
├── client-example.js           # Client JS di esempio
└── README.md                   # Questo file
```

## 🛠️ Client di Esempio

Vedi `client-example.js` per un esempio di client JavaScript/TypeScript che mostra come:
- Registrarsi
- Fare login
- Ottenere profilo utente
- Aggiornare profilo
- Rinnovare token

```javascript
import ForumAPIClient from './client-example.js';

const client = new ForumAPIClient('http://localhost');

// Registrazione
await client.register('user@example.com', 'username', 'password');

// Login
await client.login('user@example.com', 'password');

// Ottenere profilo
const user = await client.getCurrentUser();
```

## 🐛 Troubleshooting

### Errore: "Cannot connect to database"
```bash
# Controllare se postgres è in esecuzione
docker-compose ps

# Verificare i log di postgres
docker-compose logs postgres
```

### Errore: "Port already in use"
```bash
# Verificare quali container/processi usano le porte
# Windows: netstat -ano
# Linux/Mac: lsof -i :80

# Fermare e riavviare
docker-compose down
docker-compose up -d
```

### Token JWT non valido
- Verificare che il token non sia scaduto (default: 30 minuti)
- Controllare il formato header: `Authorization: Bearer <token>`
- Rinnovare il token con `/auth/refresh`

## 🔄 Prossimi Passi

- [ ] Aggiungere rotte specifiche del forum (posts, comments)
- [ ] Implementare ruoli utente (admin, moderatore)
- [ ] Aggiungere email verification
- [ ] Implementare password reset
- [ ] Aggiungere refresh token con rotazione
- [ ] Implementare rate limiting
- [ ] Aggiungere caching con Redis
- [ ] Implementare logging strutturato

## 📄 Licenza

[Specifiare la licenza del progetto]

## 👨‍💻 Sviluppatore

Marco - TPSIT

## 📧 Supporto

Per problemi o domande, creare un issue nel repository.


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