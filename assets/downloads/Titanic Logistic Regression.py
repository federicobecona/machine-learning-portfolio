import pandas as pd 
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split 

input_file = "titanic.csv"
dataset = pd.read_csv(input_file, header=0)

dataset.drop(labels = ["body", "cabin","pclass","name","ticket"], axis = 1, inplace = True)
dataset["age"].fillna(dataset["age"].mean(), inplace = True)
dataset.dropna(subset=['fare'], how='all', inplace=True)
dataset.dropna(subset=['embarked'], how='all', inplace=True)
dataset["boat"].fillna('0', inplace = True)
dataset["home.dest"].fillna('0', inplace = True)

le_sex = LabelEncoder()
le_sex.fit(dataset["sex"])
encoded_sex_training = le_sex.transform(dataset["sex"])
dataset["sex"] = encoded_sex_training

le_embarked = LabelEncoder()
le_embarked.fit(dataset["embarked"])
encoded_embarked_training = le_embarked.transform(dataset["embarked"])
dataset["embarked"] = encoded_embarked_training

le_embarked = LabelEncoder()
le_embarked.fit(dataset["home.dest"])
encoded_embarked_training = le_embarked.transform(dataset["home.dest"])
dataset["home.dest"] = encoded_embarked_training

le_embarked = LabelEncoder()
le_embarked.fit(dataset["boat"])
encoded_embarked_training = le_embarked.transform(dataset["boat"])
dataset["boat"] = encoded_embarked_training

print(dataset.keys)

X = dataset.drop(labels=["survived"], axis=1)
y = dataset["survived"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25,random_state=0, shuffle=True)

model = LogisticRegression(solver='liblinear', random_state=0)
model.fit(X_train, y_train)
pred_logreg = model.predict(X_test)
acc_logreg = accuracy_score(y_test, pred_logreg)
print("The Score for Logistic Regression is: " + str(acc_logreg))