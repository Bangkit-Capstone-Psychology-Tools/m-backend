import { PrismaClient, Tools } from '@prisma/client';
import { RegisterToolDto, ToolsNlpDto, ToolsPredictMentalHealthDto } from '../dtos';
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
} from 'routing-controllers';
import { json } from 'body-parser';
import axios from 'axios';

/**
 * UserService class
 * @class
 */
export class PsychologyToolsService {
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

    async registerTool(registerToolDto: RegisterToolDto) {
        try {
            // If email is already registered
            if (await this.getByApiLink(registerToolDto.apiLink)) {
                console.log('The Api Link already registered');
                throw new BadRequestError(`Error: Api Link is already registered`);
            }
      
            // Hash password
            return this.prisma.tool.create({
                data: registerToolDto,
            });
        } catch (error) {
            throw new BadRequestError(`Error: ${error}`);
        }
    }

    async getByApiLink(api: string) {
        try {
            return await this.prisma.tool.findUnique({
                where: { api_link: api },
            });
        } catch (error) {
            throw new InternalServerError(`Error: ${error}`);
        }
    }

    async getById(uuid: string) {
        try {
            return await this.prisma.tool.findUnique({
                where: { id: uuid },
            });
        } catch (error) {
            throw new InternalServerError(`Error: ${error}`);
        }
    }

    async doRequestAndSave(link: string, ans: any, name: string, toolId: string, userId: string) {
        const res = await axios.post(link, ans, {
            headers: {
              'Content-Type': 'application/json'
            }
        })

        let resString: string = JSON.stringify(res.data)
        
        try {
            return this.prisma.result.create({
                data: {
                    toolId: toolId,
                    userId: userId,
                    name: name,
                    answers: ans,
                    result: resString,
                },
            });
        } catch (error) {
            throw new BadRequestError(`Error: ${error}`);
        }
    }

    async toolsPredictMentalHealth(toolsPredictMentalHealthDto: ToolsPredictMentalHealthDto) {
        // Punya sony
        let answers = toolsPredictMentalHealthDto.toJson()
        let json: string = JSON.stringify(answers)

        const id: string = "1231241421";
        let tool = this.getById(id)

        // request ke tool.apiLink
    }

    async toolAngga1(toolAngga1Dto: ToolAngga1Dto) {
        // Punya Angga
        let answers = toolAngga1Dto.toJson()
        let json: string = JSON.stringify(answers)

        const id: string = "1231241421";
        let tool = this.getById(id)
    }

    async toolAngga2(toolAngga2Dto: ToolsNlpDto, userId: string) {
        // Punya Angga
        let answers = toolAngga2Dto.toJson()

        const toolId: string = "1231241421";
        let tool = await this.getById(toolId)

        const result = await this.doRequestAndSave(tool.apiLink, answers, answers.name, toolId, userId)

        return result.answers
    }

    async toolHowYesterdayClassification(toolHowYesterdayClassificationDto: ToolsNlpDto) {
        // Punya Yoel
        let answers = toolHowYesterdayClassificationDto.toJson()
        let json: string = JSON.stringify(answers)

        const id: string = "1231241421";
        let tool = this.getById(id)
        // request ke Backend ML dan dapetin hasil (bikin linknya mock dulu)

        // masukkan jawaban ke result

        // selesai

    }
}