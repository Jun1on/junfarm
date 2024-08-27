import re

def extract_crypto_names(text):
    pattern = r"logo\n([A-Za-z\s]+)\n[A-Z]{2,5}"
    matches = re.findall(pattern, text)
    
    crypto_names = [match.strip() for match in matches]
    
    return crypto_names

# copy paste from coinmarketcap
data = """

"""

crypto_names = extract_crypto_names(data)
print(crypto_names)
