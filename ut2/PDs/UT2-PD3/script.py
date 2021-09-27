from csv import reader
from math import sqrt
from random import randrange
import pandas as pd

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
            row[i] = (row[i] - minmax[i][0])
            (minmax[i][1] - minmax[i][0])

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
for i in range(10):
    print(dataset[i])
for i in range(14):
    str_column_to_float(dataset,i)
minmax = dataset_minmax(dataset)
means = column_means(dataset)
stdevs = column_stdevs(dataset, means)
print(minmax)
print(means)
print(stdevs)
normalized_dataset = dataset.copy()
normalize_dataset(normalized_dataset, minmax)
standarized_dataset = dataset.copy()
standardize_dataset(standarized_dataset, means, stdevs)
train_test_split(dataset)