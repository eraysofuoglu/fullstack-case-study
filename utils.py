import requests

def get_gold_price():
    url = "https://www.goldapi.io/api/XAU/USD"
    headers = {
        "x-access-token": "goldapi-723sm9qe22kv-io",
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            ounce_price = float(data['price'])  
            gram_price = round(ounce_price / 31.1035, 2)
            return gram_price
        else:
            print("GoldAPI error:", response.status_code)
            return 70.0
    except Exception as e:
        print("GoldAPI exception:", e)
        return 70.0

def calculate_price(product, gold_price):
    popularity = product['popularityScore'] 
    weight = product['weight']
    return round((popularity + 1) * weight * gold_price, 2)
