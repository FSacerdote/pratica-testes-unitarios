import { createRental } from "../factories/rentals-factory";
import rentalsRepository from "../../src/repositories/rentals-repository";
import moviesRepository from "../../src/repositories/movies-repository";
import rentalsService, { checkMoviesValidForRental, checkUserAbleToRental, userIsUnderAge } from "../../src/services/rentals-service";
import { createUser } from "../factories/user-factory";

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

  it("checkUserAbleToRental", async ()=>{

    jest.spyOn(rentalsRepository, "getRentalsByUserId").mockImplementationOnce((): any => {
      return [1,2,3]
    })

    const result = checkUserAbleToRental(10)

    expect(result).rejects.toEqual({
      message: "The user already have a rental!" ,
      name: "PendentRentalError"
    })
  })

  it("checkMoviesValidForRental - notFound", async ()=>{

    const user = createUser(100, 18)

    jest.spyOn(moviesRepository, "getById").mockImplementationOnce((): any => {
      undefined
    })

    const result = checkMoviesValidForRental([10], user)

    expect(result).rejects.toEqual({
      message: "Movie not found." ,
      name: "NotFoundError"
    })
  })

  it("checkMoviesValidForRental - movieAlredyInRental", async ()=>{

    const user = createUser(100, 18)

    jest.spyOn(moviesRepository, "getById").mockImplementationOnce((): any => {
      return {rentalId: 10}
    })

    const result = checkMoviesValidForRental([10], user)

    expect(result).rejects.toEqual({
      message: "Movie already in a rental." ,
      name: "MovieInRentalError"
    })
  })

  it("userIsUnderAge - underage", async ()=>{
    const user = createUser(17, 3)

    const result = userIsUnderAge(user)

    expect(result).toBe(true)
  })

  it("userIsUnderAge - not underage", async ()=>{
    const user = createUser(60, 30)

    const result = userIsUnderAge(user)

    expect(result).toBe(false)
  })

})