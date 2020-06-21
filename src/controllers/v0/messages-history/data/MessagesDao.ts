import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Message } from '../models/Message'
import { config } from '../../../../config/config'

export class MessagesDao {
    
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient()) {
    }

    async getMessagesOfChannel(channelId: string): Promise<Message[]> {     
      const result = await this.docClient.query({
        TableName: config.aws.messagesHistoryTableName,
        KeyConditionExpression: 'channelId = :channelId',
        ExpressionAttributeValues: {
            ':channelId': channelId
        }
      }).promise()
      
      return result.Items as Message[]
    }

    async addMessage(message: Message): Promise<Message>{

      await this.docClient.put({
          TableName: config.aws.messagesHistoryTableName,
          Item: message
        }).promise()
    
      return message;
    }
  }

function createDynamoDBClient() {
    return new AWS.DynamoDB.DocumentClient()
  }