import { PrismaClient, User } from '@prisma/client';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from 'routing-controllers';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { IUser } from '../interfaces/IUser';
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../utils/GenerateJWT';
import { LoginDto } from '../dtos';

/**
 * UserService class
 * @class
 */
export class UserService {
  /** @type {PrismaClient} */
  private prisma: PrismaClient;

  /**
   * UserService constructor,
   * instantiates prisma object
   * @constructor
   * @returns void
   */
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get all users
   * @memberof UserService
   * @returns {Promise<IUser[]>}
   */
  async index(): Promise<IUser[]> {
    const users: IUser[] = await this.prisma.user.findMany();
    return users;
  }

  /**
   * Get one user by UUID
   * @memberof UserService
   * @param {string} uuid
   * @returns {Promise<IUser | null>}
   */
  async getByUUID(uuid: string): Promise<IUser | null> {
    const user: IUser | null = await this.prisma.user.findUnique({
      where: { id: uuid }
    });

    if (!user) {
      throw new NotFoundError(`User with UUID "${uuid}" not found`);
    }

    return user;
  }

  /**
   * Get user by email
   * @memberof UserService
   * @param {string} email
   * @returns {Promise<IUser | null>}
   */
  async getByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      }) as IUser;
    } catch (error) {
      throw new InternalServerError(`Error: ${error}`);
    }try {
      return await this.prisma.user.findUnique({
        where: { email },
      }) as IUser;
    } catch (error) {
      throw new InternalServerError(`Error: ${error}`);
    }
  }

  /**
   * Create user
   * @memberof UserService
   * @param {CreateUserDto} createUserDto
   * @returns {Promise<User>}
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // If email is already registered
      if (await this.getByEmail(createUserDto.email)) {
        console.log('Email already registered');
        throw new BadRequestError(`Error: Email is already registered`);
      }

      return this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new BadRequestError(`Error: ${error}`);
    }
  }

  /**
   * Soft delete (set isActive=false) user
   * @memberof UserService
   * @param {string} uuid
   * @returns {Promise<void>}
   */
  async delete(uuid: string): Promise<void> {
    try {
      // Verify if exists
      this.getByUUID(uuid);

      await this.prisma.user.delete({
        where: { id: uuid },
      });
    } catch (error) {
      throw new BadRequestError(`Error: ${error}`);
    }
  }

  async login(loginDto: LoginDto): Promise<{}> {
    try {
      const { id, email } = loginDto;

      // Find user by email and get their id, email and password
      const userService = new UserService();
      const user: IUser | null = await userService.getByEmail(email);

      // User doesn't exist
      if (!user) {
        return {
          ok: 2,
          message: "need register",
        }
      }

      // Generate JWT
      const token = await generateJWT(user.id);

      return {
        ok: 1,
        token: `Bearer ${token}`,
      };
    } catch (error) {
      throw new InternalServerError(`Error ${error}`);
    }
  }
}
