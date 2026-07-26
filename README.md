# AWS Event-Driven Data Processing System

![AWS](https://img.shields.io/badge/AWS-Cloud-orange)
![Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900)
![Amazon S3](https://img.shields.io/badge/Amazon-S3-red)
![DynamoDB](https://img.shields.io/badge/Amazon-DynamoDB-blue)
![API Gateway](https://img.shields.io/badge/API-Gateway-green)
![EC2](https://img.shields.io/badge/Amazon-EC2-orange)

A cloud-native **event-driven data processing system** built using Amazon S3, AWS Lambda, Amazon DynamoDB, Amazon API Gateway, and Amazon EC2. The application automatically processes uploaded student data and displays the updated results on a hosted web dashboard.

---

# Overview

This project demonstrates an automated serverless workflow where uploading a JSON file to Amazon S3 automatically triggers an AWS Lambda function that processes the data and stores it in DynamoDB. A second Lambda function retrieves the processed data through API Gateway, enabling the EC2-hosted dashboard to display live updates.

---

# Features

- Event-driven cloud architecture
- Automatic S3 event triggering
- Serverless processing with AWS Lambda
- Managed NoSQL database using DynamoDB
- REST API using API Gateway
- EC2-hosted responsive dashboard
- Fully automated workflow
- Modular and scalable design

---

# Architecture

<img width="370" height="685" alt="Screenshot 2026-07-25 213152" src="https://github.com/user-attachments/assets/7d002bd7-3f74-4045-a5a8-5c24e9444f9a" />

---

# Project Demonstration

## Hosted Dashboard

<img width="1080" height="544" alt="image" src="https://github.com/user-attachments/assets/f2dbe298-64d3-46c9-b1b5-160d3b092b95" />

*Responsive dashboard hosted on Amazon EC2 displaying processed student records.*

---

## Amazon S3 Event Notification

<img width="1905" height="856" alt="Screenshot 2026-07-25 210807" src="https://github.com/user-attachments/assets/50b28341-57a6-4ee3-8ab5-06c7923dc8fc" />

*Automatic S3 Object Created event configured to invoke the processing Lambda.*

---

## Lambda Execution Logs

<img width="1907" height="856" alt="Screenshot 2026-07-25 210842" src="https://github.com/user-attachments/assets/8a898237-a156-492e-9b88-45005b091603" />

*CloudWatch logs showing successful automatic Lambda execution.*

---

## Amazon DynamoDB

<img width="1907" height="842" alt="Screenshot 2026-07-25 210931" src="https://github.com/user-attachments/assets/e8b1aa8e-ae94-4d71-be4e-0273218446da" />

*Processed student records successfully stored in Amazon DynamoDB.*

---

# System Workflow

1. User uploads a JSON dataset to Amazon S3.
2. S3 automatically generates an Object Created event.
3. Lambda Function #1 processes and validates the uploaded data.
4. Processed records are stored in Amazon DynamoDB.
5. The dashboard sends a request to Amazon API Gateway.
6. API Gateway invokes Lambda Function #2.
7. Lambda retrieves records from DynamoDB.
8. The EC2-hosted dashboard displays the latest processed data.

---

# AWS Services Used

| Service | Purpose |
|----------|---------|
| Amazon EC2 | Hosts the web dashboard |
| Amazon S3 | Stores uploaded JSON datasets |
| AWS Lambda | Data processing and retrieval |
| Amazon DynamoDB | Stores processed student records |
| Amazon API Gateway | REST API for frontend |
| Amazon CloudWatch | Lambda monitoring and logs |
| AWS IAM | Secure access management |

---

# Project Structure

```text
AWS-Event-Driven-Data-Processing-System/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── lambda/
│   ├── ProcessStudentData.py
│   └── GetStudentData.py
│
├── sample-data/
│   ├── students.json
│   └── student.json
│
├── README.md
└── .gitignore
```

---

# Technology Stack

- HTML5
- CSS3
- JavaScript
- Amazon EC2
- Amazon S3
- AWS Lambda
- Amazon DynamoDB
- Amazon API Gateway
- Amazon CloudWatch
- AWS IAM

---

# Setup & Deployment Guide

## Step 1: Clone the Repository

```bash
git clone https://github.com/sushantkumarkhobian-lab/AWS-Event-Driven-Data-Processing-System.git

cd AWS-Event-Driven-Data-Processing-System
```

---

## Step 2: Create a DynamoDB Table

Create a DynamoDB table with the following configuration:

| Property | Value |
|----------|-------|
| Table Name | `ProcessedStudents` |
| Partition Key | `id` |
| Type | String |

Keep all other settings as default.

---

## Step 3: Create an IAM Role for Lambda

Create an IAM Role with **Lambda** as the trusted entity.

Attach the following policies:

- `AmazonDynamoDBFullAccess`
- `AmazonS3ReadOnlyAccess`
- `AWSLambdaBasicExecutionRole`

Name the role:

```
EventDrivenLambdaRole
```

---

## Step 4: Deploy the Processing Lambda

Create a Lambda function:

| Property | Value |
|----------|-------|
| Function Name | `ProcessStudentData` |
| Runtime | Python 3.13 |
| Execution Role | `EventDrivenLambdaRole` |

Copy the code from:

```
lambda/ProcessStudentData.py
```

Deploy the function.

---

## Step 5: Deploy the Read Lambda

Create another Lambda function:

| Property | Value |
|----------|-------|
| Function Name | `GetStudentData` |
| Runtime | Python 3.13 |
| Execution Role | `EventDrivenLambdaRole` |

Copy the code from:

```
lambda/GetStudentData.py
```

Deploy the function.

---

## Step 6: Create an S3 Bucket

Create an S3 bucket (bucket name must be globally unique).

Example:

```
processstudentdata-yourname
```

Leave all other settings as default.

---

## Step 7: Configure the S3 Event Trigger

Inside the S3 bucket:

**Properties → Event Notifications → Create Event Notification**

Configure it as follows:

| Property | Value |
|----------|-------|
| Event Name | `StudentUploadEvent` |
| Event Type | `All Object Create Events` |
| Suffix | `.json` |
| Destination | `Lambda Function` |
| Lambda Function | `ProcessStudentData` |

Save the notification.

---

## Step 8: Upload Sample Data

Upload the provided `students.json` file to the S3 bucket.

This automatically triggers the processing Lambda, which:

- Reads the uploaded JSON
- Processes and restructures the data
- Stores the processed records in DynamoDB

Verify:

- CloudWatch Logs show a successful Lambda execution.
- DynamoDB contains the processed student records.

---

## Step 9: Create an HTTP API

Create an **HTTP API** in API Gateway.

Configure:

**Integration**

```
GetStudentData
```

**Route**

```
GET /students
```

Deploy the API using either the `$default` stage or a custom stage such as `prod`.

Copy the generated Invoke URL.

Example:

```
https://<api-id>.execute-api.<region>.amazonaws.com/students
```

or

```
https://<api-id>.execute-api.<region>.amazonaws.com/prod/students
```

Verify that opening the endpoint returns the processed JSON stored in DynamoDB.

---

## Step 10: Configure the Frontend

Open:

```
frontend/script.js
```

Replace the placeholder API URL with your deployed API Gateway endpoint.

Example:

```javascript
const API_URL = "https://<api-id>.execute-api.<region>.amazonaws.com/students";
```

or

```javascript
const API_URL = "https://<api-id>.execute-api.<region>.amazonaws.com/prod/students";
```

---

## Step 11: Launch an EC2 Instance

Launch an **Amazon Linux 2023** EC2 instance.

Configure the Security Group to allow:

- SSH (22)
- HTTP (80)

Connect to the instance using SSH.

---

## Step 12: Install Nginx

Run:

```bash
sudo dnf update -y
sudo dnf install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## Step 13: Deploy the Frontend

Remove the default Nginx webpage:

```bash
sudo rm -rf /usr/share/nginx/html/*
```

Copy the contents of the `frontend` folder into:

```
/usr/share/nginx/html/
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

Open the EC2 Public IP in your browser:

```
http://<EC2_PUBLIC_IP>
```

The Event-Driven Student Dashboard should now be accessible.

---

## Step 14: Test the Complete Workflow

1. Upload a new `students.json` file to the S3 bucket.
2. Verify that the S3 event automatically invokes the `ProcessStudentData` Lambda.
3. Confirm that the processed records are stored in DynamoDB.
4. Open the hosted dashboard.
5. The webpage automatically fetches the latest data from the API Gateway endpoint and displays the updated records without any manual intervention.

---

# Future Improvements

- Amazon Cognito Authentication
- CloudFront Integration
- Infrastructure as Code (Terraform / CloudFormation)
- CI/CD with GitHub Actions
- Interactive Analytics Dashboard

---

# Author

**Sushant Kumar Khobian**

Computer Science Engineering (IoT, Blockchain & Cyber Security)

---
