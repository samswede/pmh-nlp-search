import pandas as pd

# Load the newly uploaded Excel file
new_file_path = './cleaned_posts_data_v1.xlsx'
new_data = pd.read_excel(new_file_path)

# Display the first few rows of the dataframe to verify its contents
new_data.head()

# Convert the dataframe to JSON format
json_data = new_data.to_json(orient='records')

# Save the JSON data to a file
json_file_path = './posts_collection.json'
with open(json_file_path, 'w') as file:
    file.write(json_data)


