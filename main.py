from PySide6.QtWidgets import *
from PySide6.QtCore import *
from mainUi import Ui_MainWindow
import mysql.connector


class MyApp(QMainWindow, Ui_MainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.init()

    def init(self):
        self.db = mysql.connector.connect(host='13.125.216.243', user='hun', password='1234', database='minDB', auth_plugin='mysql_native_password')
        self.cur = self.db.cursor()

        self.timer = QTimer()
        self.timer.setInterval(500) #500ms
        self.timer.timeout.connect(self.pollingQuery)


    def start(self):

        self.timer.start()

    def pollingQuery(self):
        self.cur.execute("select * from command order by time desc limit 15")
        self.ui.logText.clear()
        for (id, time, cmd_string, arg_string, is_finish) in self.cur:
            str = "%d | %s | %6s | %6s | %4d" % (id, time.strftime("%Y%m%d %H:%M:%S"), cmd_string, arg_string, is_finish)
            self.ui.logText.appendPlainText(str)

        self.db.commit()

    def closeEvent(self, event):
        self.cur.close()
        self.db.close()

    def insertCommand(self, cmd_string, arg_string):
        time = QDateTime().currentDateTime().toPython()
        is_finish = 0

        query = "insert into command(time, cmd_string, arg_string, is_finish) values (%s, %s, %s, %s)"
        value = (time, cmd_string, arg_string, is_finish)

        self.cur.execute(query, value)
        self.db.commit()

    def go(self):
        self.insertCommand("go", "0")

    def stop(self):
        self.insertCommand("stop", "0")

    def back(self):
        self.insertCommand("back", "0")

    def left(self):
        self.insertCommand("left", "0")

    def mid(self):
        self.insertCommand("mid", "0")

    def right(self):
        self.insertCommand("right", "0")

    def changeAuto(self):
        self.insertCommand("changeAuto","0")

    def changeManual(self):
        self.insertCommand("changeManual","0")

app = QApplication()
win = MyApp()
win.show()
app.exec()