import pytest
from ekg.models import EKGReading

@pytest.mark.django_db
def test_ekg_str_representation():
    reading = EKGReading.objects.create(time=0.25, voltage=1.5)
    assert str(reading) == "0.25s - 1.5mV"
