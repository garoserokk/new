import mysql.connector

db= mysql.connector.connect(host='13.125.216.243',user='hun',password='1234',database='minDB',auth_plugin='mysql_native_password')
cur = db.cursor()

cur.execute('select * from command')

for (id, time, cmd_string, arg_string, is_finish) in cur:
    print(id, time, cmd_string, arg_string, is_finish)

cur.close()
db.close()
