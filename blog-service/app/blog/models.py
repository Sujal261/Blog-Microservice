from django.db import models


class blogModel(models.Model):
    title = models.CharField(max_length=30)
    content = models.CharField(max_length=500)
    user_id = models.IntegerField(null=True, blank=True, db_index=True)

    def __str__(self):
        return self.title


# Create your models here.
