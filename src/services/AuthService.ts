import { UnauthorizedError, InternalServerError } from 'routing-controllers';
import bcryptjs from 'bcryptjs';
import { UserService } from '../services';
import { generateJWT } from '../utils/GenerateJWT';
import { LoginDto } from '../dtos/LoginDto';
import {google} from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';

/**
 * AuthService class
 * @class
 */
export class AuthService {
  private oAuth2Client: OAuth2Client;
  private prismaClient: PrismaClient;

  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    this.prismaClient = new PrismaClient();
  }

  /**
   * Login method
   * @param {LoginDto} loginDto
   * @returns {Promise<{}>}
   */
  async login(loginDto: LoginDto): Promise<{}> {
    try {
      const { email, password } = loginDto;

      // Find user by email and get their id, email and password
      const userService = new UserService();
      const user: any = await userService.getByEmail(email);

      // User doesn't exist
      if (!user) {
        throw new UnauthorizedError('Invalid credentials');
      }

      // Verify password hash
      const verifyPassword = bcryptjs.compareSync(password, user.password);

      // Wrong password
      if (!verifyPassword) {
        throw new UnauthorizedError('Invalid credentials');
      }

      // Generate JWT
      const token = await generateJWT(user.uuid);

      return {
        ok: 1,
        token: `Bearer ${token}`,
      };
    } catch (error) {
      throw new InternalServerError(`Error ${error}`);
    }
  }

  async loginOAuth(): Promise<any> {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const authorizationUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
    });

    return {
      status: "success",
      authorizationUrl,
    }
  }

  async OauthCallback(code: string): Promise<any>{
    const {tokens} = await this.oAuth2Client.getToken(code);

    this.oAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: this.oAuth2Client,
      version: 'v2',
    });

    const {data} = await oauth2.userinfo.get();

    if(!data){
      throw new UnauthorizedError('Invalid credentials');
    }


    let user = await this.prismaClient.user.findUnique({
      where: {
        email: data.email as string,
      },
    });

    if(!user){
      user = await this.prismaClient.user.create({
        data: {
          email: data.email as string,
          name: data.name as string,
          password: '',
        },
      });
    }

    const token = await generateJWT(user.uuid);
    
    return {
      ok: 1,
      token: `Bearer ${token}`,
    }

  }
}
