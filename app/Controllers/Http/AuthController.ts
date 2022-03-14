import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  public async login({request, auth}: HttpContextContract){
    const {email, password} = request.all();
    const token = await auth.attempt(email, password {
      expiresIn: '365 days'
    })
    return token;
  }

  public async logout({auth}: HttpContextContract){
    await auth.logout();
  }

  public async me({auth}: HttpContextContract){
   // await auth.authenticate(); iremos passar a responsabilidade para o middleware
  //  return {isLoggedIn: auth.isLoggedIn} // return se está logado true ou false
  // return {isLoggedIn: auth.user!.email}// return apenas o email
    return {isLoggedIn: auth.user!}
  }

}
