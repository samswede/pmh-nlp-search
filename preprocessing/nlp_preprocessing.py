# !pip install transformers openpyxl accelerate
import pandas as pd
from transformers import pipeline
import torch

#from tqdm import tqdm
from tqdm.auto import tqdm  # Importing the notebook-compatible version of tqdm


# Function to generate titles
def generate_title(description, generator):
    messages = [
        {
            "role": "system",
            "content": "Act like a function that ONLY returns the title from following linkedin post. You will answer in the form 'The title is: <title>' with no deviations.",
        },
        {"role": "user", "content": description},
    ]

    # Format the input with chat template
    prompt = generator.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    
    # Generate title
    generated_texts = generator(prompt, max_new_tokens=50, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
    generated_title = generated_texts[0]['generated_text'].strip()
    
    # Remove the prompt from the output if present
    if generated_title.startswith(prompt):
        generated_title = generated_title[len(prompt):].strip()
    
    return generated_title



def process_whole_sheet(generator, batch_size):
    # Load the Excel file
    df = pd.read_excel('./cleaned_posts_data_v1.xlsx', sheet_name='Sheet1')  # Adjust the sheet_name accordingly

    print('Excel file loaded successfully.')

    # Initialize an empty DataFrame for processed data
    processed_df = pd.DataFrame()

    # Process descriptions and generate titles in batches
    for start in tqdm(range(0, len(df), batch_size)):  # tqdm is optional, remove it if not needed
        end = start + batch_size
        # Ensure we don't go past the end of the DataFrame
        end = min(end, len(df))
        chunk = df.iloc[start:end].copy()  # Use .iloc and .copy() to avoid SettingWithCopyWarning

        # Apply the generate_title function to the chunk
        chunk['title'] = chunk['description'].apply(lambda desc: generate_title(desc, generator))

        # Append processed chunk to the processed_df DataFrame
        processed_df = pd.concat([processed_df, chunk], ignore_index=True)  # Reset the index here

        # Save the progress after processing each batch
        filename = f'./processed_excel_file_until_row_{end}.xlsx'
        processed_df.to_excel(filename, index=False)

        # Optional: Print the progress
        print(f"Processed rows {start} to {end}")

    # Final save: Save the fully processed DataFrame
    processed_df.to_excel('./processed_excel_file_final.xlsx', index=False)

    # Print the first few results to the console
    print(processed_df[['description', 'title']].head(5))

# Example usage:
# process_whole_sheet(generator, batch_size=25)


def continue_processing(generator, 
                        latest_file_path, 
                        start_row, 
                        batch_size=25, 
                        original_data_path='./cleaned_posts_data_v1.xlsx'):
    # Load the latest partially processed Excel file
    processed_df = pd.read_excel(latest_file_path)
    
    # Load the original data
    original_df = pd.read_excel(original_data_path, sheet_name='Sheet1')

    # Calculate the total number of batches needed
    total_batches = (len(original_df) - start_row + batch_size - 1) // batch_size

    # Continue processing from the last processed row in the original data
    for start in tqdm(range(start_row, len(original_df), batch_size), total=total_batches, desc="Processing"):
        end = min(start + batch_size, len(original_df))
        # Process only the rows that haven't been processed yet
        chunk = original_df.iloc[start:end].copy()
        chunk['title'] = chunk['description'].apply(lambda desc: generate_title(desc, generator))
        
        # Append the new results to the processed_df
        processed_df = pd.concat([processed_df, chunk], ignore_index=True)
        
        # Save the progress after each batch
        filename = f'./processed_excel_file_until_row_{end}.xlsx'
        processed_df.to_excel(filename, index=False)
        
        # Print is not necessary as tqdm will show progress
        print(f"Processed and saved rows until {end}")

    print("Resuming processing complete.")

# Example usage:
# continue_processing(generator, './processed_excel_file_until_row_100.xlsx', 100)

def main():
    
    # Initialize the Hugging Face pipeline with GPU support
    device = 0 if torch.cuda.is_available() else -1  # Use GPU (device 0) if available, else CPU


    #"tiiuae/falcon-7b"
    #tiiuae/falcon-40b


    #"TinyLlama/TinyLlama-1.1B-Chat-v1.0"
    #meta-llama/Llama-2-7b-chat-hf
    #meta-llama/Llama-2-13b-hf

    # Initialize the Hugging Face pipeline with your chosen model
    generator = pipeline('text-generation', 
                        model="meta-llama/Llama-2-7b-chat-hf", 
                        torch_dtype=torch.bfloat16, 
                        device_map="auto",
                        token="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") 

    print('Hugging Face pipeline initialized successfully.')

    process_whole_sheet(generator, 10, batch_size=5)

    """
    continue_processing(generator, 
                    latest_file_path='./processed_excel_file_until_row_370.xlsx',
                    start_row=370, 
                    batch_size=10, 
                    original_data_path='./cleaned_posts_data_v1.xlsx')
    """
    pass

def test():
    """
        This will run the generate_title function on the first 5 descriptions in the DataFrame,
        and print the results to the console.
    """
    # Load the Excel file
    df = pd.read_excel('./cleaned_posts_data_v1.xlsx', sheet_name='Sheet1')  # Adjust the sheet_name accordingly

    print('Excel file loaded successfully.')

    # Initialize the Hugging Face pipeline with your chosen model
    # Note: You may need to adjust the model and task based on your requirements
    generator = pipeline('text-generation', model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", torch_dtype=torch.bfloat16, device_map="auto")  # Example using GPT-2

    print('Hugging Face pipeline initialized successfully.')

    # Apply the generate_title function to the first 5 descriptions in the DataFrame
    df['title'] = df['description'].head(5).apply(lambda desc: generate_title(desc, generator))

    # Print the results to the console
    print(df[['description', 'title']].head(5))

    pass

if __name__ == '__main__':
    test()