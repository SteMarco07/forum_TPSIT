FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./app ./app
EXPOSE 8000

# Run the application directly with Uvicorn. docker-compose can override via `command`.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
