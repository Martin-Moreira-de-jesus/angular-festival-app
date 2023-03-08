import { Optional } from '@angular/core'

export type Attending = {
  editorId: string
  gamesPresented: string[]
}

export interface FestivalInterface {
  id: string
  name: string
  tablemax_1: number
  tableprice_1: number
  sqmprice_1: number
  tablebooked_1: number
  sqmbooked_1: number
  tablemax_2: number
  tableprice_2: number
  sqmprice_2: number
  tablebooked_2: number
  sqmbooked_2: number
  tablemax_3: number
  tableprice_3: number
  sqmprice_3: number
  tablebooked_3: number
  sqmbooked_3: number
  revenue: number
  attending: Attending[]
}

export class Festival implements FestivalInterface {
  public id: string
  public name: string
  public tablemax_1: number
  public tableprice_1: number
  public sqmprice_1: number
  public tablebooked_1 = 0
  public sqmbooked_1 = 0
  public tablemax_2: number
  public tableprice_2: number
  public sqmprice_2: number
  public tablebooked_2 = 0
  public sqmbooked_2 = 0
  public tablemax_3: number
  public tableprice_3: number
  public sqmprice_3: number
  public tablebooked_3 = 0
  public sqmbooked_3 = 0
  public revenue = 0
  public visitor = false
  public attending: Attending[] = []
  public get tableTotal(): number {
    return +this.tablemax_1 + +this.tablemax_2 + +this.tablemax_3
  }
  public constructor(
    name: string,
    id: string,
    @Optional() tablemax_1 = 64,
    @Optional() tableprice_1 = 110,
    @Optional() tablemax_2 = 72,
    @Optional() tableprice_2 = 200,
    @Optional() tablemax_3 = 12,
    @Optional() tableprice_3 = 300,
    @Optional() sqmprice_1?: number,
    @Optional() sqmprice_2?: number,
    @Optional() sqmprice_3?: number,
    @Optional() attending?: Attending[]
  ) {
    this.id = id
    this.name = name
    this.tablemax_1 = tablemax_1
    this.tableprice_1 = tableprice_1
    this.tablemax_2 = tablemax_2
    this.tableprice_2 = tableprice_2
    this.tablemax_3 = tablemax_3
    ;(this.tableprice_3 = tableprice_3),
      (this.sqmprice_1 =
        sqmprice_1 == null
          ? Math.round((this.tableprice_1 * 1) / 6)
          : sqmprice_1)
    this.sqmprice_2 =
      sqmprice_2 == null ? Math.round((this.tableprice_2 * 1) / 6) : sqmprice_2
    this.sqmprice_3 =
      sqmprice_3 == null ? Math.round((this.tableprice_3 * 1) / 6) : sqmprice_3
    this.attending = attending ?? []
  }

  static fromJSON(json: any): Festival {
    return new Festival(
      json.name,
      json.id,
      json.tablemax_1,
      json.tableprice_1,
      json.tablemax_2,
      json.tableprice_2,
      json.tablemax_3,
      json.tableprice_2,
      json.sqmprice_1,
      json.sqmprice_2,
      json.sqmprice_3,
      json.attending
    )
  }
}
