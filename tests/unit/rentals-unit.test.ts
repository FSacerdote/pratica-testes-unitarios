import { createRental } from "../factories/rentals-factory";
import rentalsRepository from "../../src/repositories/rentals-repository";
import rentalsService from "../../src/services/rentals-service";

describe("Rentals Service Unit Tests", () => {

  it("getRentals", async () => {

    const rental = createRental()

    jest.spyOn(rentalsRepository, "getRentals").mockImplementationOnce((): any => {
      return [rental]
    })

    const result = await rentalsService.getRentals()

    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({
      id: expect.any(Number),
      date: expect.any(Date),
      endDate: expect.any(Date),
      userId: expect.any(Number),
      closed: expect.any(Boolean)
    })]));

  })

  it("getRentalById sucess", async ()=>{

    const rental = createRental()

    jest.spyOn(rentalsRepository, "getRentalById").mockImplementationOnce((): any => {
      return rental
    })

    const result = await rentalsService.getRentalById(rental.id)

    expect(result).toEqual({
      ...rental
    })
  })

  it("getRentalById failure", async ()=>{

    jest.spyOn(rentalsRepository, "getRentalById").mockImplementationOnce((): any => {
      return undefined
    })

    const result = rentalsService.getRentalById(10)

    expect(result).rejects.toEqual({
      message: "Rental not found." ,
      name: "NotFoundError"
    })
  })

})