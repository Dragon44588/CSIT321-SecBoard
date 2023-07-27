import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="12345",
  database="321db"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM posts")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)
