import pandas as pd
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
import numpy as np
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import StandardScaler

labels = ['Edad','Fuerza','Velocidad','Lesiones','Vision','Resistencia','Agilidad','CapacidadDecision']

input_file = "sports_Training.csv"
input_file2 = "sports_Scoring.csv"
data_training = pd.read_csv(input_file, header=0)
data_scoring = pd.read_csv(input_file2, header=0)

data_training = data_training[(data_training['CapacidadDecision'] >= 3) & (data_training['CapacidadDecision'] <= 100)]
data_scoring = data_scoring[(data_scoring['CapacidadDecision'] >= 3) & (data_scoring['CapacidadDecision'] <= 100)]

scaler = StandardScaler()
data_training[labels] = scaler.fit_transform(data_training[labels])
data_scoring[labels] = scaler.fit_transform(data_scoring[labels])

X = data_training[labels].values
Y = data_training['DeportePrimario'].values

lda = LinearDiscriminantAnalysis()
lda = lda.fit(X, Y)

Xsco = data_scoring[labels].values
y_pred = lda.predict(Xsco)
df = pd.DataFrame({'Prediccion': y_pred})
writer = pd.ExcelWriter('Prediccion.xlsx', engine='xlsxwriter')
df.to_excel(writer, sheet_name='Sheet1')
writer.save()