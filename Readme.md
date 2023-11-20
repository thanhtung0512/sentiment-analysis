# This is my endterm project

In this project, I train some comments on facebook posts for sentiment analysis. Don't get confused with some files that has similar content and you don't know what to do with it.

## Just focus on these:

### crawl.py
This file simulate a bot goes into the browser and access facebook posts, then crawl comments.
This must be run first.

### processing.py
After you crawl the comments, this file will process the comments and send them to the models

### app.py
This is our api file, it send the data to React front end.

### linear_classifier.pkl, naive_bayes.pkl, lstm_model.h5
These files for saving models that you trained.

### datacmt2.txt
Where data came from.


## Models that I used to train
* Naive Bayes
* LSTM
* Linear
* SVM

## Commands

1. Run *pip install -r requirements.txt*.
2. Run server: *python app.py"*
3. Then client frontend *cd client*, *npm i* , *npm start*.

## Members
1. Nguyen Vu Thanh Tung 
2. Cao Thanh Trung 
3. Nguyen Ngoc Hiep
