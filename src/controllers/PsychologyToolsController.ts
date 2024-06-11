import {
  Body,
  JsonController,
  Get,
  Param,
  Post,
  Delete,
  OnUndefined,
} from 'routing-controllers';
// import { tool } from '@prisma/client';
import { PsychologyToolsService } from '../services';
import { RegisterToolDto } from '../dtos';
import { IToolsPredictMentalHealth } from '../interfaces/IToolsPredictMentalHealth';

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

  /**
   * Get all psychologyToolss
   * @memberof PyschologyToolsController
   * @returns {Promise<IPsychologyTools>}
   */
  @Get('/')
  index(): Promise<IPsychologyTools[]> {
    return this.psychologyToolsService.index();
  }

  /**
   * Get one psychologyTools by uuid
   * @memberof PyschologyToolsController
   * @param {string} uuid
   * @returns {Promise<IPsychologyTools | null>}
   */
  @Get('/:uuid')
  getByUUID(@Param('uuid') uuid: string): Promise<IPsychologyTools | null> {
    return this.psychologyToolsService.getByUUID(uuid);
  }

  /**
   * Create new psychologyTools
   * @memberof PyschologyToolsController
   * @param {CreatePsychologyToolsDto} data
   * @returns {Promise<PsychologyTools>}
   */
  @Post('/')
  create(@Body() data: CreatePsychologyToolsDto): Promise<PsychologyTools> {
    return this.psychologyToolsService.create(data);
  }

  /**
   * Soft delete psychologyTools
   * @memberof PyschologyToolsController
   * @param {string} uuid
   * @returns {Promise<void>}
   */
  @Delete('/:uuid')
  @OnUndefined(204)
  delete(@Param('uuid') uuid: string): Promise<void> {
    return this.psychologyToolsService.delete(uuid);
  }
}
