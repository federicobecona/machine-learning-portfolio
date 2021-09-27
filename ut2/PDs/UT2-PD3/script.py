from csv import reader
from math import sqrt
from random import randrange
import pandas as pd
import copy

columns = ['Alcohol','Malic acid','Ash','Alcalinity of ash','Magnesium','Total phenols','Flavanoids','Nonflavanoid phenols','Proanthocyanins','Color intensity','Hue','OD280/OD315 of diluted wines','Proline']

def load_csv(filename):
    dataset = list()
    with open(filename, 'r') as file:
        csv_reader = reader(file)
        for row in csv_reader:
            if not row:
                continue
            dataset.append(row)
        return dataset

def str_column_to_float(dataset, column):
    for row in dataset:
        row[column] = float(row[column].strip())

def dataset_minmax(dataset):
    minmax = list()
    for i in range(len(dataset[0])):
        col_values = [row[i] for row in dataset]
        value_min = min(col_values)
        value_max = max(col_values)
        minmax.append([value_min, value_max])
    return minmax

def column_means(dataset):
    means = [0 for i in range(len(dataset[0]))]
    for i in range(len(dataset[0])):
        col_values = [row[i] for row in dataset]
        means[i] = sum(col_values) / float(len(dataset))
    return means

def column_stdevs(dataset, means):
    stdevs = [0 for i in range(len(dataset[0]))]
    for i in range(len(dataset[0])):
        variance = [pow(row[i]-means[i], 2) for row in dataset]
        stdevs[i] = sum(variance)
        stdevs = [sqrt(x/(float(len(dataset)-1))) for x in stdevs]
    return stdevs

def normalize_dataset(dataset, minmax):
    for row in dataset:
        for i in range(len(row)):
            row[i] = (row[i] - minmax[i][0]) / (minmax[i][1] - minmax[i][0])


def standardize_dataset(dataset, means, stdevs):
    for row in dataset:
        for i in range(len(row)):
            row[i] = (row[i] - means[i]) / stdevs[i]

def train_test_split(dataset, split=0.60):
    train = list()
    train_size = split * len(dataset)
    dataset_copy = list(dataset)
    while len(train) < train_size:
        index = randrange(len(dataset_copy))
        train.append(dataset_copy.pop(index))
    return train, dataset_copy

input_file = "wine.csv"
dataset = load_csv(input_file)
print("\n- Primeras 10 filas:")
for i in range(10):
    print(dataset[i])
strToFloatDataset = copy.deepcopy(dataset)
for i in range(len(columns)+1):
    str_column_to_float(strToFloatDataset,i)
print("\n- Primeras 10 filas dataset con floats:")
for i in range(10):
    print(strToFloatDataset[i])
minmax = dataset_minmax(strToFloatDataset)
means = column_means(strToFloatDataset)
stdevs = column_stdevs(strToFloatDataset, means)
print("\n- Estadísticas: ")
for i in range(len(columns)):
    print("*"+columns[i] + ": min " + str(minmax[i][0]) + ",  max " + str(minmax[i][1]) + ", media " + str(means[i]) + ", desviación estándar " + str(stdevs[i]))
normalized_dataset = copy.deepcopy(strToFloatDataset)
standarized_dataset = copy.deepcopy(strToFloatDataset)
train_test_split_dataset = copy.deepcopy(strToFloatDataset)
normalize_dataset(normalized_dataset, minmax)
standardize_dataset(standarized_dataset, means, stdevs)
train, test = train_test_split(train_test_split_dataset)
print("\n- Primeras 10 filas dataset estandarizado:")
for i in range(10):
    print(standarized_dataset[i])
print("\n- Primeras 10 filas dataset normalizado:")
for i in range(10):
    print(normalized_dataset[i])
print("\n- Primeras 10 filas dataset de train:")
for i in range(10):
    print(train[i])
print("\n- Primeras 10 filas dataset de train:")
for i in range(10):    
    print(test[i])