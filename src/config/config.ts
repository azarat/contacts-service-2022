import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

class Config {
  private static readonly secrets = new AWS.SecretsManager({
    region: process.env.AWS_REGION,
  })

  private static async getSecret(secretName: string): Promise<string> {
    const { SecretString } = await Config.secrets
      .getSecretValue({
        SecretId: process.env.SECRET_ID,
      })
      .promise()
    const secrets = JSON.parse(SecretString)
    return secrets[secretName]
  }

  readonly apiHost: string
  readonly port: string
  mongoUri: string
  userSdkUrl: string
  userSdkSecret: string
  botPartnersToken: string
  botPartnersPassword: string
  botFeedbackToken: string
  botFeedbackPassword: string
  botModificationToken: string
  botModificationPassword: string
  botSparePartsToken: string
  botSparePartsPassword: string
  botCarOrderToken: string
  botToken: string
  botCarOrderPassword: string

  constructor() {
    this.apiHost = process.env.API_HOST
    this.port = process.env.PORT
    this.botToken = process.env.BOT_TOKEN
  }

  public async init(): Promise<void> {
    this.mongoUri = await Config.getSecret('MONGO_URI')
    this.userSdkUrl = await Config.getSecret('USER_SDK_URL')
    this.userSdkSecret = await Config.getSecret('USER_SDK_SECRET')
    this.botPartnersToken = await Config.getSecret('BOT_TOKEN_PARTNERS')
    this.botPartnersPassword = await Config.getSecret('BOT_PASSWORD_PARTNERS')
    this.botFeedbackToken = await Config.getSecret('BOT_TOKEN_FEEDBACK')
    this.botFeedbackPassword = await Config.getSecret('BOT_PASSWORD_FEEDBACK')
    this.botModificationToken = await Config.getSecret('BOT_TOKEN_MODIFICATION')
    this.botModificationPassword = await Config.getSecret(
      'BOT_PASSWORD_MODIFICATION',
    )
    this.botSparePartsToken = await Config.getSecret('BOT_TOKEN_SPARE_PARTS')
    this.botSparePartsPassword = await Config.getSecret(
      'BOT_PASSWORD_SPARE_PARTS',
    )
    this.botCarOrderToken = await Config.getSecret('BOT_TOKEN_CAR_ORDER')
    this.botCarOrderPassword = await Config.getSecret(
      'BOT_PASSWORD_CAR_ORDER',
      )
  }
}

export default new Config()
