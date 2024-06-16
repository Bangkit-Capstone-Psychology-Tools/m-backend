import { Prisma, PrismaClient, PsikologiTools} from '@prisma/client';
import { DepressionLevelModelDto, MentalDisorderModelDto, RegisterToolDto, ToolsNlpDto } from '../dtos';
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
} from 'routing-controllers';
import { json } from 'body-parser';
import axios from 'axios';
import { instanceToPlain } from 'class-transformer';

const ML_API = `${process.env.ML_BACKEND}/model/ `

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
            if (await this.getPath(registerToolDto.path)) {
                console.log('The Api Link already registered');
                throw new BadRequestError(`Error: Api Link is already registered`);
            }
      
            // Hash password
            return this.prisma.psikologiTools.create({
                data: {
                    name: registerToolDto.name,
                    path: registerToolDto.path,
                    description: registerToolDto.description,
                    class: registerToolDto.class
                },
            });
        } catch (error) {
            throw new BadRequestError(`Error: ${error}`);
        }
    }

    async getPath(path: string) {
        try {
            return await this.prisma.psikologiTools.findUnique({
                where: {
                    path: '34',
                },
            });
        } catch (error) {
            throw new InternalServerError(`Error: ${error}`);
        }
    }

    async getById(uuid: string) {
        try {
            return await this.prisma.psikologiTools.findUnique({
                where: { id: uuid },
            });
        } catch (error) {
            throw new InternalServerError(`Error: ${error}`);
        }
    }

    async doRequestAndSave(tool: PsikologiTools, ans: any, name: string, userId: string) {
        const res = await axios.post(ML_API + tool.path, ans, {
            headers: {
              'Content-Type': 'application/json'
            }
        })

        let resString: string = JSON.stringify(res.data)
        
        try {
            return this.prisma.result.create({
                data: {
                    psikologiToolsId: tool.id,
                    psikologId: userId,
                    name: name,
                    answers: ans,
                    result: resString,
                    editedResult: ""
                },
            });
        } catch (error) {
            throw new BadRequestError(`Error: ${error}`);
        }
    }

    async mentalDisorderModel(mentalDisorderModelReq: MentalDisorderModelDto, userId: string) {
        // Punya sony
        let answers = instanceToPlain(mentalDisorderModelReq)

        const toolId: string = "1231241421";
        let tool: PsikologiTools;

        try {
            tool = (await this.getById(toolId)) ?? this.emptyTools
        } catch(error) {
            throw new InternalServerError(`Error: ${error}`);
        }

        const result = await this.doRequestAndSave(tool, answers, answers.name, userId)

        return result.answers
    }

    async depressionLevelModel(depressionLevelModelReq: DepressionLevelModelDto, userId: string) {
        // Punya Angga
        let answers = instanceToPlain(depressionLevelModelReq)

        const toolId: string = "1231241421";
        let tool: PsikologiTools;

        try {
            tool = (await this.getById(toolId)) ?? this.emptyTools
        } catch(error) {
            throw new InternalServerError(`Error: ${error}`);
        }

        const result = await this.doRequestAndSave(tool, answers, answers.name, userId)

        return result.answers
    }

    private emptyTools: PsikologiTools = {
        id: "",
        name: "",
        path: "",
        class: 0,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    async textEmotionModel(textEmotionModelReq: ToolsNlpDto, userId: string) {
        // Punya Angga
        let answers = instanceToPlain(textEmotionModelReq)

        const toolId: string = "1231241421";
        let tool: PsikologiTools;

        try {
            tool = (await this.getById(toolId)) ?? this.emptyTools
        } catch(error) {
            throw new InternalServerError(`Error: ${error}`);
        }

        const result = await this.doRequestAndSave(tool, answers, answers.name, userId)

        return result.answers
    }

    async wdytYesterdayModel(wdytYesterdayModelReq: ToolsNlpDto, userId: string) {
        // Punya Yoel
        let answers = instanceToPlain(wdytYesterdayModelReq)

        const toolId: string = "1231241421";
        let tool: PsikologiTools;

        try {
            tool = (await this.getById(toolId)) ?? this.emptyTools
        } catch(error) {
            throw new InternalServerError(`Error: ${error}`);
        }

        const result = await this.doRequestAndSave(tool, answers, answers.name, userId)

        return result.answers
    }
}