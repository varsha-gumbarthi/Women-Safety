from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .controller import dispatch_drone

class DispatchDroneView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        lat = request.data.get('location_lat')
        long = request.data.get('location_long')

        if not lat or not long:
            return Response({'error': 'Location (lat & long) is required.'}, status=400)

        response = dispatch_drone(lat, long)
        return Response(response)
