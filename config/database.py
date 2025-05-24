from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote
from sqlalchemy.ext.declarative import declarative_base


password = quote("5QSGutcARYWFcCoiqyq5")
mysql_file_name = f"mysql+mysqlconnector://u4gioqauttof7dxu:{password}@byepocscujcaks5vcjfl-mysql.services.clever-cloud.com:3306/byepocscujcaks5vcjfl"

engine = create_engine(mysql_file_name, echo=True)
Session = sessionmaker(bind=engine)
Base = declarative_base()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote
from sqlalchemy.ext.declarative import declarative_base


DB_USER = "root"  
DB_PASSWORD = "Carreras1202."
DB_HOST = "127.0.0.1" 
DB_PORT = 3306
DB_NAME = "brailledb" 


mysql_connection_string = (
    f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)


engine = create_engine(mysql_connection_string, echo=True)


Session = sessionmaker(bind=engine)


Base = declarative_base()

print(f"Intentando conectar a: {mysql_connection_string}")


try:
  
    connection = engine.connect()
    print("¡Conexión a la base de datos MySQL local exitosa!")
    connection.close()
except Exception as e:
    print(f"Error al conectar a la base de datos: {e}")

