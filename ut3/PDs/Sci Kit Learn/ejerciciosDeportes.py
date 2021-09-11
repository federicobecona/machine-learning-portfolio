import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.model_selection import train_test_split
from sklearn import preprocessing

#Generating the model

input_file = "sports_Training.csv"
data_original = pd.read_csv(input_file, header=0)
print(data_original.values)

data = data_original[(data_original['CapacidadDecision'] >= 3) &(data_original['CapacidadDecision'] <= 100)]

X = data[['Edad','Fuerza','Velocidad','Lesiones','Vision','Resistencia','Agilidad','CapacidadDecision']].values
Y = data['DeportePrimario'].values

#le = preprocessing.LabelEncoder()
#Y_encoded = le.fit_transform(data['DeportePrimario'].values)

lda = LinearDiscriminantAnalysis()
lda = lda.fit(X, Y)


#Scoring

input_file2 = "sports_Scoring.csv"
data_scoring = pd.read_csv(input_file, header=0)

Xsco = data[['Edad','Fuerza','Velocidad','Lesiones','Vision','Resistencia','Agilidad','CapacidadDecision']].values

y_pred = lda.predict(Xsco)
 
print("Predicted")
print(y_pred)
print()