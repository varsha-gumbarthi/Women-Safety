from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .ml_logic import is_distress_voice

class ValidateVoiceInputView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get('text')
        tone_score = float(request.data.get('tone_score', 0))

        if not text:
            return Response({'error': 'Text is required.'}, status=400)

        result = is_distress_voice(text, tone_score)
        return Response({'distress_detected': result})
