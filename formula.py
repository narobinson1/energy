A_1 = 1500
A_2 = 2500
A_3 = 3000

F_1 = 2000
F_2 = 2500

L_1 = 500
L_2 = 100
L_3 = 800

energy_dict = {
    "A_1": A_1,
    "A_2": A_2,
    "A_3": A_3,
    "F_1": F_1,
    "F_2": F_2,
    "L_1": L_1,
    "L_2": L_2,
    "L_3": L_3,
}

F_list = ["F_1", "F_2"]
A_list = ["A_2"]
L_list = ["L_2"]

def calculateEnergy(F_list, A_list, L_list):
    F_count, A_count, L_count = len(F_list), len(A_list), len(L_list)

    F_sum, A_sum, L_sum = 0, 0, 0
    for f in F_list:
        F_sum+=energy_dict[f]
        
    for a in A_list:
        A_sum+=energy_dict[a]

    for l in L_list:
        L_sum+=energy_dict[l]
    
    energy = (i/F_count)*(F_sum) + (j/A_count)*(A_sum) + (k/L_count)*(L_sum)
    
    return energy
    


total_energy = 60000
max = 0
for i in range(6,9):
    for j in range(1,5):
        for k in range(4,25):
            temp = calculateEnergy(F_list, A_list, L_list)
            if temp <= total_energy:
                if temp > max:
                    max = temp
                    max_index = (i,j,k)
                
print(max)
print(max_index)


