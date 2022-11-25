from gpiozero import DistanceSensor
from time import sleep

trig =20
echo=21

sensor = DistanceSensor(echo,trig)

while True:
    dis=sensor.distance
    print(dis)
    sleep(0.1)

