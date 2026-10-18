from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
import gc
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password' : {'write_only' : True}} #hides the password when sending data

    def create(self, validated_data):
        return User.objects.create_user(**validated_data) #hash password

class RegisterView(generics.CreateAPIView): #this class basically creates a new object (users) / simple words: takes care of register
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny] #allowAny for test / change to IsAuthenticated for deploy

class EKGDataView(APIView):
    permission_classes = [AllowAny] #can see ekg page only when authenticated
    parser_classes = (MultiPartParser, FormParser)
    chunk_size = 360000  # read in chunks / moved to class level

    def load_csv_data(self):
        csv_file = settings.BASE_DIR.parent / 'ecg_clean.csv'  # ECG sample data at the repository root

        try:

            data_file = pd.read_csv(csv_file, chunksize=self.chunk_size)

            for chunk in data_file:
                #filter rows
                chunk = chunk.dropna(subset=["time", "voltage"])
                chunk = chunk[(chunk["time"] != "0") & (chunk["voltage"] != "0")]

                filtered_data = chunk[["time", "voltage"]].to_dict(orient="records")

                print(f"processed chunk with {len(filtered_data)} valid rows")

                return (filtered_data)

        except Exception as e:
            print(f"Error loading data: {e}")
            return []

    def get(self, request):
        #load data when enter api/ekg/
        readings = self.load_csv_data()

        if readings:
            return JsonResponse({"data": readings}, status=200)
        else:
            return JsonResponse({"error": "No valid data found"}, status=400)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return JsonResponse({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            #read file in chunks
            data_file = pd.read_csv(file, chunksize=self.chunk_size)
            all_readings = []

            for chunk in data_file:
                for index, row in chunk.iterrows():
                    if pd.isnull(row['time']) or (isinstance(row['time'], str) and row['time'].strip() == '') or row['time'] == '0':
                        continue
                    if pd.isnull(row['voltage']) or (isinstance(row['voltage'], str) and row['voltage'].strip() == '') or row['voltage'] == '0':
                        continue

                    all_readings.append({"time": row['time'], "voltage": row['voltage']})

            return JsonResponse({"message": "File processed successfully", "data": all_readings}, status=status.HTTP_200_OK)

        except Exception as e:
            return JsonResponse({"error": f"Error processing file: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
