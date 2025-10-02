# En Linux/Mac
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# O usando OpenSSL
openssl rand -hex 32


copiar eso en la consola