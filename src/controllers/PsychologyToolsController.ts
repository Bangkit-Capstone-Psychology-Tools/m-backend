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
    // @Body() body: RegisterToolDto,
    @Req() req: Request
  ) {

    // const body: RegisterToolDto = req.body as {
    //   name: string,
    //   class: number,
    //   description: string,
    //   path: string
    // }
    
    // const body: RegisterToolDto = Body()(req.body) as RegisterToolDto;

    return {
      message: "success",
      data: {
        // body: body,
        userId: req.userId
      }
    }
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

    // const body: MentalDisorderModelDto = req.body as {
    //   name: string,
    //   kesedihan: number, 
    //   euphoria: number, 
    //   lelah: number, 
    //   gangguanTidur: number, 
    //   moodSwing: number, 
    //   pikiranBunuhDiri: number, 
    //   anoreksia: number, 
    //   menghormatiOtoritas: number, 
    //   memberikanPenjelasan: number, 
    //   responsAgresif: number, 
    //   tidakPeduli: number, 
    //   mudahGugup: number, 
    //   mengakuiKesalahan: number, 
    //   overthinking: number, 
    //   aktivitasSeksual: number, 
    //   mudahKonsentrasi: number, 
    //   optimis: number
    // };
    // const body: MentalDisorderModelDto = Body()(req.body) as MentalDisorderModelDto;

    const result = await this.psychologyToolsService.mentalDisorderModel(body, user);
    return { message: 'Data processed successfully', result };
    
  }

  @Post('/depression_level')
  @UseBefore(AuthMiddleware)
  async depressionLevelModel(@Req() req: Request) {
    const user = req.userId; // Access the user property set in the middleware
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const body: DepressionLevelModelDto = req.body as {
      name: string,
      sleep: number,
      appetite: number,
      interest: number,
      fatigue: number,
      worthlessness: number,
      concentration: number,
      agitation: number,
      suicidalIdeation: number,
      sleepDisturbance: number,
      aggression: number,
      panicAttacks: number,
      hopelessness: number,
      restlessness: number,
      lowEnergy: number
    };

    const result = await this.psychologyToolsService.depressionLevelModel(body, user);
    return { message: 'Data processed successfully', result };
    
  }

  @Post('/text_emotion')
  @UseBefore(AuthMiddleware)
  async textEmotionModel(@Req() req: Request) {
    const user = req.userId; // Access the user property set in the middleware
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const body: ToolsNlpDto = req.body as { answers: any; name: string };

    const result = await this.psychologyToolsService.textEmotionModel(body, user);
    return { message: 'Data processed successfully', result };
    
  }

  @Post('/wdyt_yesterday')
  @UseBefore(AuthMiddleware)
  async wdytYesterdayModel(@Req() req: Request) {
    const user = req.userId; // Access the user property set in the middleware
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const body: ToolsNlpDto = req.body as { answers: any; name: string };

    const result = await this.psychologyToolsService.wdytYesterdayModel(body, user);
    return { message: 'Data processed successfully', result };
    
  }
}
