import { differenceInSeconds } from 'date-fns'
import { DateManagerContract } from '../../contracts/dateManager'

export class DateFnsManager implements DateManagerContract {
  getDifferenceInSeconds(initialDate: Date, finalDate: Date) {
    return differenceInSeconds(initialDate, finalDate)
  }
}
