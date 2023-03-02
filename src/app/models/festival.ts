import { Optional } from "@angular/core";

export class Festival {
    public id?: string;
    public name!: string;
    public tablemax_1: number;
    public tableprice_1: number;
    public sqmprice_1: number;
    public tablebooked_1: number = 0;
    public sqmbooked_1: number = 0;
    public tablemax_2: number;
    public tableprice_2: number;
    public sqmprice_2: number;
    public tablebooked_2: number = 0;
    public sqmbooked_2: number = 0;
    public tablemax_3: number;
    public tableprice_3: number;
    public sqmprice_3: number;
    public tablebooked_3: number = 0;
    public sqmbooked_3: number = 0;
    public revenue: number = 0;
    public visitor: boolean = false;
    public get tableTotal() : number { return this.tablemax_1 + this.tablemax_2 + this.tablemax_3; }
    public constructor(
        name: string,
        @Optional() id?: string,
        @Optional() tablemax_1: number = 64,
        @Optional() tableprice_1: number = 110,
        @Optional() tablemax_2: number = 72,
        @Optional() tableprice_2: number = 200,
        @Optional() tablemax_3: number = 12,
        @Optional() tableprice_3: number = 300,
        @Optional() sqmprice_1?: number,
        @Optional() sqmprice_2?: number,
        @Optional() sqmprice_3?: number,
    ) {
        this.id = id
        this.name = name
        this.tablemax_1 = tablemax_1
        this.tableprice_1 = tableprice_1
        this.tablemax_2 = tablemax_2
        this.tableprice_2 = tableprice_2
        this.tablemax_3 = tablemax_3
        this.tableprice_3 = tableprice_3,
        this.sqmprice_1 = (sqmprice_1 == null) ? Math.round(this.tableprice_1 * 1/6) : sqmprice_1
        this.sqmprice_2 = (sqmprice_2 == null) ? Math.round(this.tableprice_2 * 1/6) : sqmprice_2
        this.sqmprice_3 = (sqmprice_3 == null) ? Math.round(this.tableprice_3 * 1/6) : sqmprice_3
    }
}
