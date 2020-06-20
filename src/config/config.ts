export const config = {
  "aws": {
    "reigion": process.env.AWS_REGION,
    "profile": process.env.AWS_PROFILE,
    "media_bucket": process.env.AWS_BUCKET,
    "messagesHistoryTableName": process.env.MESSAGES_HISTORY_TABLE_NAME
  },
  "jwksUrl": process.env.JWKS_URL,
  "url": process.env.URL,
}
