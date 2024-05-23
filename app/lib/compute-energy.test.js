import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import computeEnergyOfAppliances, { computeMinimumEnergy } from '@/app/lib/compute-energy'

test.each([
    ['Fridge'],
    ['Fridge', 'Freezer'],
    ['Fridge', 'Freezer', 'Washing machine'],
    ['Fridge', 'Freezer', 'Washing machine', 'Dishwasher'],
    ['Fridge', 'Freezer', 'Washing machine', 'Dishwasher', 'Induction stove'],
    ['Fridge', 'Freezer', 'Washing machine', 'Dishwasher', 'Induction stove', 'TV', 'Small Light', 'Big Light'],
])('compute min energy', computeMinimumEnergy)