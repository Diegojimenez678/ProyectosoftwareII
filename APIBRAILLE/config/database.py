from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote
from sqlalchemy.ext.declarative import declarative_base


password = quote("5QSGutcARYWFcCoiqyq5")
mysql_file_name = f"mysql+mysqlconnector://u4gioqauttof7dxu:{password}@byepocscujcaks5vcjfl-mysql.services.clever-cloud.com:3306/byepocscujcaks5vcjfl"

engine = create_engine(mysql_file_name, echo=True)
Session = sessionmaker(bind=engine)
Base = declarative_base()

