import pandas as pd
import matplotlib
import matplotlib.pyplot as plt

input_file = "titanic.csv"
dataset = pd.read_csv(input_file, header=0)

print("-----DATASET------")
print(dataset.to_string())

print("-----MISSSING VALUES------")
print(pd.isnull(dataset).sum())

#Se reemplazan los missing values de edad por la media
dataset["age"].fillna(dataset["age"].mean(), inplace = True)

#Se eliminan las columnas body y cabin por altos porcentajes 
# de missing values siendo estos 90.7% y 77% respectivamente
dataset.drop(labels = ["body", "cabin"], axis = 1, inplace = True)

#Se eliminan la fila sin valor para fare y las dos filas
# Ssin valor para embarked
dataset.dropna(subset=['fare'], how='all', inplace=True)
dataset.dropna(subset=['embarked'], how='all', inplace=True)

#Se asigna una categoría única para los missing values de boay y home.dest
dataset["boat"].fillna('U', inplace = True)
dataset["home.dest"].fillna('U', inplace = True)

print(pd.isnull(dataset).sum())


print("-----GRÁFICAS------")
print("- x = Age, y = Survived")
print("- x = Fare, y = Survived")
colors = ("red", "blue")
plt.scatter(dataset['age'], dataset['survived'], s=10, c=dataset['survived'],cmap=matplotlib.colors.ListedColormap(colors))
plt.show()
plt.scatter(dataset['fare'], dataset['survived'], s=10, c=dataset['survived'],cmap=matplotlib.colors.ListedColormap(colors))
plt.show()

print("-----FEATURE ENGINEERING------")
