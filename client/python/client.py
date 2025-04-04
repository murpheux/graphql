import requests

url = 'https://localhost:3000/graphql'
query = """
query {
    book (id:7){
        title
        id
        author
    }
}
"""

headers = {
    'Content-Type': 'application/json',
    # 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' 
}

response = requests.post(url, json={'query': query}, headers=headers, verify=False)

# Print the JSON response
print(response.json())