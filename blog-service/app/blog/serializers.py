from rest_framework import serializers

from .models import blogModel


class blogSerializer(serializers.ModelSerializer):
    class Meta:
        model = blogModel
        fields = ["id", "title", "content", "user_id"]

    def create(self, validated_data):
        blog = blogModel.objects.create(
            title=validated_data["title"],
            content=validated_data["content"],
            user_id=validated_data.get("user_id"),
        )
        return blog

