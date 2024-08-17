#BLOGPOST
from django.db import models
from User.models import User

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.FileField(upload_to='blog_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author_1 = models.ForeignKey(User, on_delete=models.CASCADE ,limit_choices_to={'role':'ADMIN'} , related_name='admin' )
    author_2 = models.ForeignKey(User, on_delete=models.CASCADE ,limit_choices_to={'role':'INSTRUCTOR'}, related_name='instructor' )


    def __str__(self):
        return self.title

class Questionary(models.Model):
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='questionaries')
    question = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Question for {self.blog_post}"

class Response(models.Model):
    questionary = models.ForeignKey(Questionary, on_delete=models.CASCADE, related_name='responses')
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response by {self.name} to {self.questionary}"





