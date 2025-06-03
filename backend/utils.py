import os
import json
import random
import string

def generate_token(length=16):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def save_user_data(email, data, token, user_dir, token_file):
    filename = f"{email.replace('@', 'at')}.json"
    user_file_path = os.path.join(user_dir, filename)

    with open(user_file_path, 'w') as f:
        json.dump({
            "email": email,
            "data": data,
            "token": token
        }, f, indent=4)

    if os.path.exists(token_file):
        with open(token_file, 'r') as f:
            token_map = json.load(f)
    else:
        token_map = {}

    token_map[token] = user_file_path

    with open(token_file, 'w') as f:
        json.dump(token_map, f, indent=4)

def load_data_by_token(token, token_file, user_dir):
    if not os.path.exists(token_file):
        return None

    with open(token_file, 'r') as f:
        token_map = json.load(f)

    file_path = token_map.get(token)
    if not file_path or not os.path.exists(file_path):
        return None

    with open(file_path, 'r') as f:
        return json.load(f)