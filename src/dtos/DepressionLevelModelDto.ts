import { Min, Max, Length } from 'class-validator';

export class DepressionLevelModelDto {
    @Length(5,20)
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

    toJson(): Record<string, number> {
        return {
            sleep: this.sleep,
            appetite: this.appetite,
            interest: this.interest,
            fatigue: this.fatigue,
            worthlessness: this.worthlessness,
            concentration: this.concentration,
            agitation: this.agitation,
            suicidalIdeation: this.suicidalIdeation,
            sleepDisturbance: this.sleepDisturbance,
            aggression: this.aggression,
            panicAttacks: this.panicAttacks,
            hopelessness: this.hopelessness,
            restlessness: this.restlessness,
            lowEnergy: this.lowEnergy,
        };
    }
}
