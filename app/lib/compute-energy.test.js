import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {expect, jest, test} from '@jest/globals';
import computeEnergyOfAppliances, { computeMinimumEnergy } from '@/app/lib/compute-energy'

describe('computeMinimumEnergy should', ()=>{
    test.todo('not be NaN or undefined')
    test.todo('return an integer value')
    test.todo('return the correct value for the listOfSelectedAppliances argument')
})
describe('computeEnergyOfAppliances should', ()=>{
    test.todo('return a non-empty array')
    test.todo('return the correct value for the listOfSelectedAppliances and totalEnergy arguments')
})
describe('sortIntoCategories should', ()=>{
    test.todo('return a non-empty object')
    test.todo('return the correct value')
})
describe('findHoursOfAppliances should', ()=>{
    test.todo('return a non-empty array')
    test.todo('return the correct value')
})