const appliancePowers = {
    "Fridge": 2,
    "Washing machine": 1.5,
    "TV": 0.5,
    "Freezer": 2.5,
    "Dishwasher": 2.5,
    "Induction stove": 3,
    "Small Light": 0.1,
    "Big Light": 0.8,
}
const applianceCategories = {
    "Fridge": "F",
    "Washing machine": "A",
    "TV": "L",
    "Freezer": "F",
    "Dishwasher": "A",
    "Induction stove": "A",
    "Small Light": "L",
    "Big Light": "L",
}
const categoryDuration = {
    "F":[6,7,8],
    "A":[1,2,3,4],
    "L":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
}

function sortIntoCategories(listOfSelectedAppliances) {
    const F_list = []
    const A_list = []
    const L_list = []
    listOfSelectedAppliances.map((appliance)=>{
        switch(applianceCategories[appliance]) {
            case "F":
                F_list.push(appliance)
                break
            case "A":
                A_list.push(appliance)
                break
            case "L":
                L_list.push(appliance)
                break
        }
    })
    return {
        "F": F_list,
        "A": A_list,
        "L": L_list,
    }
}

function computeEnergy(appliancesInCategoryLists, i, j, k) {
    const F_count = appliancesInCategoryLists["F"].length
    let fListLength = appliancesInCategoryLists["F"]
    const A_count = appliancesInCategoryLists["A"].length
    const L_count = appliancesInCategoryLists["L"].length

    let F_sum = 0
    let A_sum = 0
    let L_sum = 0
    appliancesInCategoryLists["F"].map((appliance)=>{
        F_sum += appliancePowers[appliance]
    })
    appliancesInCategoryLists["A"].map((appliance)=>{
        A_sum += appliancePowers[appliance]
    })
    appliancesInCategoryLists["L"].map((appliance)=>{
        L_sum += appliancePowers[appliance]
    })
    let energy = 0
    if (F_count != 0){
        let fEnergy = (i/F_count)*(F_sum)
        energy += fEnergy
    }
    if (A_count != 0){
        let aEnergy = (j/A_count)*(A_sum)
        energy += aEnergy
    }
    if (L_count != 0){
        let lEnergy = (k/L_count)*(L_sum)
        energy += lEnergy
    }
    return energy
}

export function computeMinimumEnergy(listOfSelectedAppliances){
    const appliancesInCategoryLists = sortIntoCategories(listOfSelectedAppliances)
    let fHour = categoryDuration["F"][0]
    let aHour = categoryDuration["A"][0]
    let lHour = categoryDuration["L"][0]
    let minimumEnergy = computeEnergy(appliancesInCategoryLists, fHour, aHour, lHour)
    let minimumEnergyRounded = Math.round(minimumEnergy)
    return minimumEnergyRounded
}

function findHoursOfAppliances(listOfSelectedAppliances, totalEnergy) {
    const appliancesInCategoryLists = sortIntoCategories(listOfSelectedAppliances)
    let max = 0
    let max_index = 0
    let i_start =categoryDuration["F"][0]
    let i_end =categoryDuration["F"][categoryDuration["F"].length-1]
    let j_start =categoryDuration["A"][0]
    let j_end =categoryDuration["A"][categoryDuration["A"].length-1]
    let k_start =categoryDuration["L"][0]
    let k_end =categoryDuration["L"][categoryDuration["L"].length-1]
    for (let i=i_start;i<i_end+1;i++) {
        for (let j=j_start;j<j_end+1;j++) {
            for (let k=k_start;k<k_end+1;k++) {
                let temp = computeEnergy(appliancesInCategoryLists, i, j, k)
                if (temp<=totalEnergy) {
                    if (temp>max) {
                        max_index=[i,j,k]
                    }
                }
            }
        }
    }
    return max_index
}

export default function computeEnergyOfAppliances(listOfSelectedAppliances, totalEnergy){
    const hoursOfAppliances = findHoursOfAppliances(listOfSelectedAppliances, totalEnergy)
    const fHours = hoursOfAppliances[0]
    const aHours = hoursOfAppliances[1]
    const lHours = hoursOfAppliances[2]
    const appliancesInCategoryLists = sortIntoCategories(listOfSelectedAppliances)
    const F_count = appliancesInCategoryLists["F"].length
    const A_count = appliancesInCategoryLists["A"].length
    const L_count = appliancesInCategoryLists["L"].length
    const applianceEnergies = {}
    const F_multiplier = fHours/F_count
    const A_multiplier = aHours/A_count
    const L_multiplier = lHours/L_count
    listOfSelectedAppliances.map((appliance)=>{
        switch(applianceCategories[appliance]){
            case "F":
                applianceEnergies[appliance] = F_multiplier*appliancePowers[appliance]
                break
            case "A":
                applianceEnergies[appliance] = A_multiplier*appliancePowers[appliance]
                break
            case "L":
                applianceEnergies[appliance] = L_multiplier*appliancePowers[appliance]
                break
        }
    })
    return applianceEnergies
}