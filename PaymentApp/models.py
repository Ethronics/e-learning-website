from django.db import models
from User.models import User
from CurriculumApp.models import Curriculum

PENDEING = 'P'
COMPLETED = 'C'
FAILED = 'F'

PAYMENT_STATUS = (
    (PENDEING , 'P'),
    (COMPLETED , 'C'),
    (FAILED , 'F'),
)

class Payment(models.Model):
    student = models.ForeignKey(User , on_delete=models.CASCADE , related_name='student_payment' , limit_choices_to={'role':'STUDENT'})
    approved_by = models.ForeignKey(User , on_delete=models.CASCADE , related_name='approved_payment' , limit_choices_to={'role':'ADMIN'})
    reference_no = models.CharField(max_length=255)
    unit_price = models.ForeignKey(Curriculum , on_delete=models.CASCADE)
    status = models.CharField(max_length=1 , choices=PAYMENT_STATUS , default=PENDEING)

    def __str__(self) -> str:
        return f"{self.student} is paid {self.unit_price}"






