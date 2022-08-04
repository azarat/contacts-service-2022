export class SparePartsDto {
  name: string
  phone: string
  car: {
    mark: string
    model: string
    year: number
  }
  vin: string
  comment: string
}
