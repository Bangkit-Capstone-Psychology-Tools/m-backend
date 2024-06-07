import { JsonController, Post, Body, Res, Get, Req } from 'routing-controllers';
import { LoginDto } from '../dtos/LoginDto';
import { AuthService } from '../services';

/**
 * AuthController class
 * @class
 * @decorator `JsonController('/auth')`
 */
@JsonController('/auth')
export class AuthController {
  /**
   * authService property
   * @private
   * @type {AuthService}
   */
  private authService: AuthService;
  /**
   * Instantiates AuthService
   * @constructor
   * @returns void
   */
  constructor() {
    this.authService = new AuthService();
  }
  /**
   * Login method
   * @param {LoginDto} LoginDto
   * @returns {Promise<{}>}
   */
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{}> {
    return this.authService.login(loginDto);
  }

  @Get("/google")
  async loginOauth(@Res() res: any): Promise<any> {
    console.log("loginOauth");
    const {status, authorizationUrl} = await this.authService.loginOAuth();
    console.log(status, authorizationUrl);
    if(status == "success") {
      return res.redirect(authorizationUrl);
    }
    return res.status(400).send({error: "An error occurred"});
  }

  @Get('/google/callback')
  async googleCallback(@Req() req: any, @Res() res: any): Promise<any> {
    const {code} = req.query;
    
    const {ok, token} = await this.authService.OauthCallback(code);
    
    if(ok == 1) {
      return res.status(200).send({token});
    }
    return res.status(400).send({error: "An error occurred"});
  }
}
