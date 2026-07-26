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

Follow these steps to deploy the project on your own AWS account.

## 1. Clone the Repository

```bash
git clone https://github.com/sushantkumarkhobian-lab/AWS-Event-Driven-Data-Processing-System.git
cd AWS-Event-Driven-Data-Processing-System
```

---

## 2. Create an Amazon S3 Bucket

- Create a new S3 bucket.
- Enable **Event Notifications**.
- Configure an **Object Created** event.

---

## 3. Create the Processing Lambda

Create a Lambda function named:

```text
ProcessStudentData
```

- Upload the processing source code.
- Use **Python 3.13** runtime.
- Assign an IAM role with permissions for:
  - Amazon S3
  - Amazon DynamoDB
  - CloudWatch Logs
- Configure the S3 bucket as the event trigger.

---

## 4. Create a DynamoDB Table

Create a DynamoDB table and note its table name.

The processing Lambda stores all transformed student records inside this table.

---

## 5. Create the Retrieval Lambda

Create another Lambda function named:

```text
GetStudentData
```

- Upload the retrieval source code.
- Use **Python 3.13** runtime.
- Grant read access to DynamoDB.
- Return the stored records as JSON.

---

## 6. Configure API Gateway

- Create a REST API.
- Create a **GET** endpoint.
- Integrate it with **GetStudentData**.
- Enable **CORS**.
- Deploy the API.
- Copy the generated Invoke URL.

---

## 7. Configure the Frontend

Inside `frontend/script.js`, replace the API endpoint with your deployed API Gateway URL.

```javascript
const API_URL = "YOUR_API_GATEWAY_URL";
```

---

## 8. Launch an EC2 Instance

- Launch an Ubuntu EC2 instance.
- Install Nginx.

```bash
sudo apt update
sudo apt install nginx -y
```

Copy the frontend files into:

```text
/var/www/html/
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

Access the dashboard using:

```text
http://YOUR_EC2_PUBLIC_IP
```

---

## 9. Test the Event-Driven Workflow

1. Upload a JSON file to the S3 bucket.
2. Verify that **ProcessStudentData** executes automatically.
3. Confirm the processed records are stored in DynamoDB.
4. Open the EC2-hosted dashboard.
5. The dashboard requests data through API Gateway.
6. **GetStudentData** retrieves the records from DynamoDB.
7. The updated student data is displayed automatically.

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
