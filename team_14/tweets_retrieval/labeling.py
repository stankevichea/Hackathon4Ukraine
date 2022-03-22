from tracemalloc import start
import pickle as pkl
import pandas as pd
import os
import sys
from os import path
from icecream import ic

ic.configureOutput(prefix='')

# Backups directory (after each 10 labels backup is created)
if not path.exists('backup'):
    os.mkdir('backup')

unlabeled_df = pd.read_csv('2.csv')

# Index of last labeled tweet if script terminated runtime
# Existence of this file indicates that backup was created
# If exists saved state is loaded
if path.exists('backup/state'):
    with open('backup/state', 'rb') as f:
        start_index, ones, zeros = pkl.load(f)
    out_df = pd.read_csv('labeled.csv')
else:
    start_index = 0
    ones = 0
    zeros = 0
    out_df = pd.DataFrame(columns = ['text', 'label'])

k = start_index

ic(start_index, ones, zeros)

for i, tweet in enumerate(unlabeled_df.loc[start_index:].iterrows()):
    text = tweet[1]['text']
    ic(zeros, ones, k)
    print(text + "\n")
    
    label = -1
    while label not in [0, 1, 2, 999]:
        try:
            label = int(input("INSERT LABEL[0, 1 are labels, 2 to discard tweet, 999 to save and exit]: "))
        except Exception:
            continue

    if label == 2:
        os.system('clear')
    
    elif label == 999:
        out_df.to_csv('labeled.csv', index=False)
        print(out_df)
        with open('backup/state', 'wb') as f:
            pkl.dump((k - 1, ones, zeros), f)
        sys.exit(0)
    else:
        # Create dataframe row and add to out_df
        if label: 
            ones += 1
        else: 
            zeros += 1
        temp_df = pd.DataFrame({'text': [text], 'label': [label]})
        out_df = out_df.append(temp_df).reset_index(drop=True)
    
        os.system('clear')
    
    if i%10 == 0 and i > 0:
        with open('backup/state', 'wb') as f:
            pkl.dump((k + 1, ones, zeros), f)
        out_df.to_csv(f'backup/backup_{k//10}', index=False)
    k += 1

out_df.to_csv('labeled.csv', index=False)

# Uwagi: ... na końcu tweeta to retweet, chyba najlepiej discardowac
# Jezeli to są jakieś retweety do jakiegos trolla to zapiszcie gdziekolwiek jego nick to się sprawdzi jego konto