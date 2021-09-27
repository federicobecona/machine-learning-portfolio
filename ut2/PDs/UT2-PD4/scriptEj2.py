import pandas as pd
import matplotlib
import matplotlib.pyplot as plt

input_file = "titanic.csv"
dataset = pd.read_csv(input_file, header=0)

#Probabilidad de que haya sobrevivido una persona con género G y clase de pasajero C
def probSgivenGandC(G, C):
    size = len(dataset)
    sizeGC = len(dataset[(dataset['sex'] == G) & (dataset['pclass'] == C)])
    sizeSGC = len(dataset[(dataset['sex'] == G) & (dataset['pclass'] == C) & (dataset['survived'] == 1)])
    probGC = sizeGC/size
    probSGC = sizeSGC/size
    return probSGC/probGC
print("female, class 1, " + str(probSgivenGandC("female",1)))
print("female, class 2, " + str(probSgivenGandC("female",2)))
print("female, class 3, " + str(probSgivenGandC("female",3)))
print("male, class 1, " + str(probSgivenGandC("male",1)))
print("male, class 2, " + str(probSgivenGandC("male",2)))
print("male, class 3, " + str(probSgivenGandC("male",3)))

def probSgivenMaxAandC(A, C):
    size = len(dataset)
    sizeMaxAC = len(dataset[(dataset['age'] <= A) & (dataset['pclass'] == C)])
    sizeSMaxAC = len(dataset[(dataset['age'] <= A) & (dataset['pclass'] == C) & (dataset['survived'] == 1)])
    probMaxAC = sizeMaxAC/size
    probSMaxAC = sizeSMaxAC/size
    return probSMaxAC/probMaxAC
print("Less than 3yo, class 3, " + str(probSgivenMaxAandC(10,3)))