FROM python:3.11-slim


RUN apt-get update && apt-get install -y \
    gcc libpq-dev \
    steghide exiftool binwalk xxd procps lsof findutils coreutils \
    curl wget git iputils-ping net-tools dnsutils iproute2 \
    vim nano openssh-client ca-certificates \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*


# Set working directory
WORKDIR /app

# Copy Python dependencies and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Daphne separately (if not in requirements.txt)
RUN pip install --no-cache-dir daphne

# Copy project files
COPY . .

# Plant challenges (e.g., flags, scripts)
RUN chmod +x ./challenges/setup_flags.sh && ./challenges/setup_flags.sh

# Copy and set up the startup script
COPY ./start.sh /app/start.sh
RUN chmod +x /app/start.sh

# ✅ This CMD will run at container start
CMD ["/app/start.sh"]
