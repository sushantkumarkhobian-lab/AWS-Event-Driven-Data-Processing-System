import json
import boto3
import uuid
from datetime import datetime

s3 = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")

table = dynamodb.Table("ProcessedStudents")


def calculate_grade(marks):
    if marks >= 90:
        return "A+"
    elif marks >= 80:
        return "A"
    elif marks >= 70:
        return "B"
    elif marks >= 60:
        return "C"
    else:
        return "F"


def lambda_handler(event, context):

    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]

    response = s3.get_object(Bucket=bucket, Key=key)

    students = json.loads(response["Body"].read())

    for student in students:

        item = {
            "id": str(uuid.uuid4()),
            "student": student["name"].upper(),
            "marks": student["marks"],
            "grade": calculate_grade(student["marks"]),
            "city": student["city"],
            "processedAt": datetime.utcnow().isoformat()
        }

        table.put_item(Item=item)

    return {
        "statusCode": 200,
        "body": "Success"
    }