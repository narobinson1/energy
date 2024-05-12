const appliancePowers = {
    "Fridge": 2000,
    "Washing machine": 1500,
    "TV": 500,
    "Freezer": 2500,
    "Dishwasher": 3000,
    "Small Light": 100,
    "Big Light": 800,
}
const applianceCategories = {
    "Fridge": "F",
    "Washing machine": "A",
    "TV": "L",
    "Freezer": "F",
    "Dishwasher": "A",
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
            case "A":
                A_list.push(appliance)
            case "L":
                L_list.push(appliance)
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
    const energy = (i/F_count)*(F_sum) + (j/A_count)*(A_sum) + (k/L_count)*(L_sum)
    return energy
}

// ["Fridge", "Freezer", "Dishwasher", "Small Light"]
export default function computeEnergyOfAppliances(listOfSelectedAppliances, totalEnergy) {
    const appliancesInCategoryLists = sortIntoCategories(listOfSelectedAppliances)
    for (let i=categoryDuration["F"][0];i<categoryDuration["F"][-1];i++) {
        for (let j=categoryDuration["A"][0];j<categoryDuration["A"][-1];j++) {
            for (let k=categoryDuration["L"][0];k<categoryDuration["L"][-1];k++) {
                let temp = computeEnergy(appliancesInCategoryLists, i, j, k)
                if (temp == totalEnergy) {
                    console.log("i:", i)
                    console.log("j:", j)
                    console.log("k:", k)
                }
            }
        }
    }
}