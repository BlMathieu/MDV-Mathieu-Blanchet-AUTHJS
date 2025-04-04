import secrets
def generateLabel(name, value):
    file = open(".env","a")
    file.write(name+'="' + value +'"'+"\n")
    file.close()

def main():
    file = open(".env","w")
    file.close()
    generateLabel("DB_HOST", "localhost")
    generateLabel("DB_PORT","3306")
    generateLabel("DB_USER", "monUtilisateurAuthJS")
    generateLabel("DB_PASSWORD", "monmotdepassesécurisé")
    generateLabel("DB_NAME", "db_authjs")
    generateLabel("SERVER_PORT", "3000")
    generateLabel("ACCESS_KEY",secrets.token_hex(200))
    generateLabel("REFRESH_KEY",secrets.token_hex(200))
main()