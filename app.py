from flask import Flask, jsonify
from flask_cors import CORS  
import json
from utils import get_gold_price, calculate_price

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/products', methods=['GET'])
def get_products():
    with open('products.json') as f:
        products = json.load(f)

    gold_price = get_gold_price()

    for product in products:
        product['price'] = calculate_price(product, gold_price)
        product['popularityOutOf5'] = round(product['popularityScore'] * 5, 1)

    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)
