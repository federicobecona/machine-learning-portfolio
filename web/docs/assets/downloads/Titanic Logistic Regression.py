import pandas as pd 
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score
from numpy import mean
from numpy import std

input_file = "titanic.csv"
dataset = pd.read_csv(input_file, header=0)

dataset.drop(labels = ["body", "cabin","pclass","name","ticket"], axis = 1, inplace = True)

dataset["age"].fillna(dataset["age"].mean(), inplace = True)

dataset["boat"].fillna('0', inplace = True)
dataset["home.dest"].fillna('0', inplace = True)


dataset = dataset[dataset['sibsp'] <= 5]
dataset = dataset[dataset['parch'] <= 5]
dataset = dataset[dataset['age'] <= 70]
dataset = dataset[dataset['fare'] <= 350]
dataset.dropna(subset=['fare'], how='all', inplace=True)
dataset.dropna(subset=['embarked'], how='all', inplace=True)


le = LabelEncoder()
le.fit(dataset["sex"])
encoded_sex_training = le.transform(dataset["sex"])
dataset["sex"] = encoded_sex_training
le.fit(dataset["embarked"])
encoded_embarked_training = le.transform(dataset["embarked"])
dataset["embarked"] = encoded_embarked_training
le.fit(dataset["home.dest"])
encoded_embarked_training = le.transform(dataset["home.dest"])
dataset["home.dest"] = encoded_embarked_training
le.fit(dataset["boat"])
encoded_embarked_training = le.transform(dataset["boat"])
dataset["boat"] = encoded_embarked_training


X = dataset.drop(labels=["survived"], axis=1)
y = dataset["survived"]
X, y = make_classification(n_samples=1283, n_features=10)
cv = StratifiedKFold(n_splits=10, random_state=None, shuffle=True)
model = LogisticRegression()
scores = cross_val_score(model, X, y, scoring='accuracy', cv=cv, n_jobs=-1)
print('Accuracy: %.3f (%.3f)' % (mean(scores), std(scores)))