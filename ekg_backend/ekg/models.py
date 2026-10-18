from django.db import models

class EKGReading(models.Model):
    """ Reprezentarea unei inregistrari ECG """

    time = models.FloatField()  # în secunde / changed to match varName
    voltage = models.FloatField()    # milivolți


    def __str__(self):
        return f"{self.time}s - {self.voltage}mV"




