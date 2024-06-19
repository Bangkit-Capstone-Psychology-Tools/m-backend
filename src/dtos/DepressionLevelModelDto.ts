import { Min, Max, Length } from 'class-validator';

export class DepressionLevelModelDto {
    @Length(0,50)
    name: string;
    
    @Min(1)
    @Max(5)
    sleep: number;

    @Min(1)
    @Max(5)
    appetite: number;

    @Min(1)
    @Max(5)
    interest: number;

    @Min(1)
    @Max(5)
    fatigue: number;

    @Min(1)
    @Max(5)
    worthlessness: number;

    @Min(1)
    @Max(5)
    concentration: number;

    @Min(1)
    @Max(5)
    agitation: number;

    @Min(1)
    @Max(5)
    suicidalIdeation: number;

    @Min(1)
    @Max(5)
    sleepDisturbance: number;

    @Min(1)
    @Max(5)
    aggression: number;

    @Min(1)
    @Max(5)
    panicAttacks: number;

    @Min(1)
    @Max(5)
    hopelessness: number;

    @Min(1)
    @Max(5)
    restlessness: number;

    @Min(1)
    @Max(5)
    lowEnergy: number;
}
