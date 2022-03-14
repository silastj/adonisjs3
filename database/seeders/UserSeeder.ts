import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeederSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      email: 'silastj@hotmail.com',
      password:'123456'
    })
  }
}
