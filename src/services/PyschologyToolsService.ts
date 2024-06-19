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
import { UserService } from './UserService';
import { IUser } from '../interfaces/IUser';

const ML_API = `${process.env.ML_BACKEND}/model/ `

/**
 * UserService class
 * @class
 */
export class PsychologyToolsService {
    /** @type {PrismaClient} */
    private prisma: PrismaClient;
    private userService: UserService;
  
    /**
     * UserService constructor,
     * instantiates prisma object
     * @constructor
     * @returns void
     */
    constructor() {
      this.prisma = new PrismaClient();
      this.userService = new UserService();
    }

    async index(): Promise<PsikologiTools[]> {
        const tools: PsikologiTools[] = await this.prisma.psikologiTools.findMany();
        return tools;
    }

    async registerTool(registerToolDto: RegisterToolDto) {
        try {

            console.log(registerToolDto);
            // If email is already registered
            if (await this.getByPath(registerToolDto.path)) {
                console.log('The Api Link already registered');
                throw new BadRequestError(`Error: Api Link is already registered`);
            }

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

    async getByPath(path: string) {
        try {
            return await this.prisma.psikologiTools.findUnique({
                where: {
                    path: path,
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

    async checkClass(tool: PsikologiTools, userId: string) {
        const user: IUser | null = (await this.userService.getByUUID(userId));

        if (user && typeof user.class === 'number') {
            return tool.class <= user.class;
        } else {
            return false;
        }
    }

    async mentalDisorderModel(mentalDisorderModelReq: MentalDisorderModelDto, userId: string) {
        // Punya sony
        let answers = instanceToPlain(mentalDisorderModelReq)
        console.log(answers)
        const toolPath: string = "mental_disorder";
        let tool: PsikologiTools;
        console.log(toolPath)
        try {
            tool = (await this.getByPath(toolPath)) ?? this.emptyTools
        } catch(error) {
            throw new InternalServerError(`Error: ${error}`);
        }

        if(await this.checkClass(tool, userId)) {
            throw new InternalServerError(`Error: Class tidak lebih tinggi atau sama dengan user`);
        }

        const result = await this.doRequestAndSave(tool, answers, answers.name, userId)

        return result.answers
    }

    async depressionLevelModel(depressionLevelModelReq: DepressionLevelModelDto, userId: string) {
        // Punya Angga
        let answers = instanceToPlain(depressionLevelModelReq)

        const toolPath: string = "depression_level";
        let tool: PsikologiTools;

        try {
            tool = (await this.getByPath(toolPath)) ?? this.emptyTools
        } catch(error) {
            throw new InternalServerError(`Error: ${error}`);
        }

        if(await this.checkClass(tool, userId)) {
            throw new InternalServerError(`Error: Class tidak lebih tinggi atau sama dengan user`);
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

        const toolPath: string = "text_emotion";
        let tool: PsikologiTools;

        try {
            tool = (await this.getByPath(toolPath)) ?? this.emptyTools
        } catch(error) {
            throw new InternalServerError(`Error: ${error}`);
        }

        if(await this.checkClass(tool, userId)) {
            throw new InternalServerError(`Error: Class tidak lebih tinggi atau sama dengan user`);
        }

        const result = await this.doRequestAndSave(tool, answers, answers.name, userId)

        return result.answers
    }

    async wdytYesterdayModel(wdytYesterdayModelReq: ToolsNlpDto, userId: string) {
        // Punya Yoel
        let answers = instanceToPlain(wdytYesterdayModelReq)

        const toolPath: string = "wdyt_yesterday";
        let tool: PsikologiTools;

        try {
            tool = (await this.getByPath(toolPath)) ?? this.emptyTools
        } catch(error) {
            throw new InternalServerError(`Error: ${error}`);
        }

        if(await this.checkClass(tool, userId)) {
            throw new InternalServerError(`Error: Class tidak lebih tinggi atau sama dengan user`);
        }

        const result = await this.doRequestAndSave(tool, answers, answers.name, userId)

        return result.answers
    }
}