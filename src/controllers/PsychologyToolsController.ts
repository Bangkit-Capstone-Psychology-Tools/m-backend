import {
  Body,
  JsonController,
  Get,
  Param,
  Post,
  Delete,
  OnUndefined,
  Req,
  UseBefore,
} from 'routing-controllers';
// import { tool } from '@prisma/client';
import { Request } from 'express'
import { PsychologyToolsService } from '../services';
import { DepressionLevelModelDto, MentalDisorderModelDto, RegisterToolDto, ToolsNlpDto } from '../dtos';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { PsikologiTools } from '@prisma/client';
import { before } from 'node:test';

/**
 * PyschologyToolsController class
 * @class
 */
@JsonController('/tools')
export class PyschologyToolsController {
  /**
   * psychologyToolsService property
   * @private
   * @type {PsychologyToolsService}
   */
  private psychologyToolsService: PsychologyToolsService;

  /**
   * Instantiates PsychologyToolsService
   * @constructor
   * @returns void
   */
  constructor() {
    this.psychologyToolsService = new PsychologyToolsService();
  }

  @Get('/')
  index(): Promise<PsikologiTools[]> {
    return this.psychologyToolsService.index();
  }

  @Post('/')
  @UseBefore(AuthMiddleware)
  async registerTool(
    @Body() body: RegisterToolDto,
    @Req() req: Request
  ) {
    return this.psychologyToolsService.registerTool(body);
  }

  @Post('/mental_disorder')
  @UseBefore(AuthMiddleware)
  async mentalDisorderModel(
    @Body() body: MentalDisorderModelDto,
    @Req() req: Request
  ) {
    const user = req.userId; // Access the user property set in the middleware
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const result = await this.psychologyToolsService.mentalDisorderModel(body, user);
    return { message: 'Data processed successfully', result };
    
  }

  @Post('/depression_level')
  @UseBefore(AuthMiddleware)
  async depressionLevelModel(
    @Body() body: DepressionLevelModelDto,
    @Req() req: Request
  ) {
    const user = req.userId; // Access the user property set in the middleware
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const result = await this.psychologyToolsService.depressionLevelModel(body, user);
    return { message: 'Data processed successfully', result };
    
  }

  @Post('/text_emotion')
  @UseBefore(AuthMiddleware)
  async textEmotionModel(
    @Body() body: ToolsNlpDto,
    @Req() req: Request
  ) {
    const user = req.userId; // Access the user property set in the middleware
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const result = await this.psychologyToolsService.textEmotionModel(body, user);
    return { message: 'Data processed successfully', result };
    
  }

  @Post('/wdyt_yesterday')
  @UseBefore(AuthMiddleware)
  async wdytYesterdayModel(
    @Body() body: ToolsNlpDto,
    @Req() req: Request
  ) {
    if (!req.userId) {
      return { error: 'User not authenticated' };
    }

    const result = await this.psychologyToolsService.wdytYesterdayModel(body, req.userId);
    return { message: 'Data processed successfully', result };
    
  }
}
