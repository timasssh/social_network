#!/bin/sh

set -eu

psql \
    --username "$POSTGRES_USER" \
    --dbname "$POSTGRES_DB" \
    --set=app_user="$POSTGRES_APP_USER" \
    --set=app_password="$POSTGRES_APP_PASSWORD" \
    --set=app_db="$POSTGRES_DB" \
    --set=ON_ERROR_STOP=1 <<'EOSQL'

CREATE ROLE :"app_user"
    WITH LOGIN
    PASSWORD :'app_password';

GRANT CONNECT ON DATABASE :"app_db"
    TO :"app_user";

GRANT USAGE, CREATE ON SCHEMA public
    TO :"app_user";

EOSQL