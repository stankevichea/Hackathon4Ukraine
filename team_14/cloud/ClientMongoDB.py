from pymongo import MongoClient
from pprint import pprint


client = MongoClient(
    "mongodb+srv://obukowski:cKeZ8bMmChydetKt@cluster2.l4m5p.mongodb.net/main?retryWrites=true&w=majority")

db = client.main
# collection = db.tweet_with_model_output

### EXAMPLE ENTRY

insert = {"id": 1504800156851621888, "model_output": 0.3423}
db.tweet_with_model_output.insert_one(insert)


### FIND ENTRY BY ID

# response = db.tweet_with_model_output.find_one({"id": 12345678})
# print(response)


class MongoDBClient:
    def __init__(self):
        self.db = MongoClient(
            "mongodb+srv://obukowski:cKeZ8bMmChydetKt@cluster2.l4m5p.mongodb.net/main?retryWrites=true&w=majority").main.tweet_with_model_output

    def update_db(self, attribute):
        return self.db.insert_one(attribute)

    def read_db(self, attribute):
        return self.db.find_one(attribute)

    def drop_document(self, attribute):
        return self.db.dropIndex(attribute)

    def drop_all_document(self):
        return self.db.dropIndexes("*")


# MongoClient().drop_document({"id": 12345678})
