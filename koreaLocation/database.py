# -*- coding: utf-8 -*- 
import pymysql
import clientConfig
class database:
    def __init__(self):
        self.db = pymysql.connect(     host = 'localhost',
                                        user = 'root',
                                        password = clientConfig.db_passwd,
                                        db = 'mydb',
                                        charset='utf8' )
    def connect(self):
        self.db = pymysql.connect(    host = 'localhost',
                                      user = 'root',
                                      password = clientConfig.db_passwd,
                                      db = 'mydb',
                                      charset='utf8' )
        
    def version_Select(self):
        self.cursor = self.db.cursor()
        # execute SQL query using execute() method.
        self.cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = self.cursor.fetchone()
        print("Database version : %s " % data)

    def select_database_table(self, sql):
        self.connect()
        try:
            print('조회중...')
            cursor = self.db.cursor()
            cursor.execute(sql)
            print('조회완료')
                     
            data = cursor.fetchall()
            cursor.close()
            return data    
        except Exception as ex :
            print('에러 종류 ' , ex)
    
    def select_database_table_params(self, sql, params):
        self.connect()
        try:
            print('조회중...')
            cursor = self.db.cursor()
            cursor.execute(sql, params)
            print('조회완료')
                     
            data = cursor.fetchall()
            cursor.close()
            return data    
        except Exception as ex :
            print('에러 종류 ' , ex)
    
    
    
    
    
    
    def insertData(self, sql, params):
        self.connect() 
        
        try : 
            cursor = self.db.cursor()
            print("inserting...")
            cursor.executemany(sql, params) 
            self.db.commit()
            cursor.close()
            print('***************************************inserting Success')
            
        except: 
             print(" inserting error  에러 종류  " )
            
        self.db.close()
    
    