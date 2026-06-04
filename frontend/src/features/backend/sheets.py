import time
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
import random

scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive",
]

creds = ServiceAccountCredentials.from_json_keyfile_name(
    "src/backend/credentials.json", 
    scopes=scope,
)

client = gspread.authorize(creds)

def data_to_json():
    sheet = client.open("Personal Finance").sheet1

    all_values = sheet.get_all_values()

    headers = [h.strip().lower() for h in all_values[0]]
    rows = all_values[1:]  

    json_data = []

    for row in rows:
        item = dict(zip(headers, row))
        if "recurring" in item:
            item["recurring"] = item["recurring"].strip().upper() == "TRUE"
        item_with_id = {"id": str(random.randint(1, 1000000))}
        item_with_id.update(item)
        json_data.append(item_with_id)

    with open("output.json", "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)

while True:
    data_to_json()
    time.sleep(60)

