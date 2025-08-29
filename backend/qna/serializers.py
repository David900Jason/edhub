# qna/serializers.py
from rest_framework import serializers
from .models import Question, Reply
from users.models import User
from videos.models import Video

class StudentBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "profile_img"]


class VideoBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["id", "title"]

class ReplySerializer(serializers.ModelSerializer):
    teacher = StudentBriefSerializer(read_only=True)

    class Meta:
        model = Reply
        fields = ["id", "question", "teacher", "content", "created_at"]
        read_only_fields = ["teacher", "created_at"]

    def validate(self, data):
        request = self.context["request"]
        user = request.user

        if not user.is_staff:
            raise serializers.ValidationError("Only teachers can reply.")

        # Only run "question" validation if creating
        if self.instance is None:
            question = data.get("question")
            if not question:
                raise serializers.ValidationError({"question": "This field is required."})

            # teacher can only reply to their own videos
            if question.video.course.teacher != user:
                raise serializers.ValidationError("You can only reply to your own videos.")

            # enforce one reply per question
            if Reply.objects.filter(question=question).exists():
                raise serializers.ValidationError("This question already has a reply.")

        return data

    def create(self, validated_data):
        validated_data["teacher"] = self.context["request"].user
        return super().create(validated_data)


class QuestionSerializer(serializers.ModelSerializer):
    student = StudentBriefSerializer(read_only=True)
    video = VideoBriefSerializer(read_only=True)
    video_id = serializers.PrimaryKeyRelatedField(
        queryset=Video.objects.all(),
        source="video",
        write_only=True
    )
    reply = ReplySerializer(read_only=True)  # nested reply

    class Meta:
        model = Question
        fields = ["id", "student", "content", "created_at", "reply", "video", "video_id"]
        read_only_fields = ["student", "created_at"]

    def create(self, validated_data):
        validated_data["student"] = self.context["request"].user
        return super().create(validated_data)
