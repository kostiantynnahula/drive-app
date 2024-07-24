terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "drive-app" {
  bucket = "drive-instructor-app-bucket"

  tags = {
    Name        = "drive-instructor-app-bucket"
    Environment = "dev"
  }
}

resource "aws_s3_bucket_ownership_controls" "drive-app" {
  bucket = aws_s3_bucket.drive-app.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "drive-app" {
  bucket = aws_s3_bucket.drive-app.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "drive-app" {
  depends_on = [
    aws_s3_bucket_ownership_controls.drive-app,
    aws_s3_bucket_public_access_block.drive-app
  ]

  bucket = aws_s3_bucket.drive-app.id
  acl    = "public-read"
}

resource "aws_s3_bucket_versioning" "drive-app" {
  bucket = aws_s3_bucket.drive-app.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_object" "organizations-logo-folder" {
  bucket = aws_s3_bucket.drive-app.id
  key    = "organizations-logo/"
  acl    = aws_s3_bucket_acl.drive-app.acl
}

resource "aws_s3_object" "users-logo-folder" {
  bucket = aws_s3_bucket.drive-app.id
  key    = "users-logo/"
  acl    = aws_s3_bucket_acl.drive-app.acl
}
