export const aws = {
    "AWS_ACCESS_KEY_ID": "AKIAUQL6NW6DU5QKC5MK",
    "AWS_SECRET_ACCESS_KEY": "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 ",
    "AWS_STORAGE_BUCKET_NAME": "libraryprojectg2",
    "AWS_S3_FILE_REGION": "eu-north-1",
    "AWS_S3_FILE_ALBUM": "media",
    "AWS_S3_CUSTOM_DOMAIN": "{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com",
    "AWS_S3_OBJECT_PARAMETERS": {"CacheControl": "max-age :86400"},

    "PUBLIC_MEDIA_LOCATION": "media ",
    "MEDIA_URL": "https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/",
    "DEFAULT_FILE_STORAGE": "base.storage_backends.MediaStorage ",
}