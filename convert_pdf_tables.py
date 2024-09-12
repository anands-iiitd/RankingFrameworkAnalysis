import tabula as tb
import pandas as pd
import os
from tabula.io import read_pdf




def dump_pdf_tables_to_csv(src_path,dest_path,verbose=False):
    '''
    Converts tables in the pdf files and appends it to a csv file page by page. 
    NIRF tables are well structured and a better format might make the cleaning / analysis better. 
    TBD: Improve the formatting of the tables & clean up the dataframe to contain only numerical values for analytics.  
        1) Some tables have multiple headers, titles, etc. 
        2) Some tables have numerical and text values in the same cell.
    '''
    pdf_file_list = os.listdir(src_path)
    if not pdf_file_list:
        print('Source dir is empty. Returning...')
        return None
    
    os.makedirs(dest_path,exist_ok=True)
    
    for filename in pdf_file_list:
    
        curr_csv_file_path = os.path.join(dest_path,filename.split('.')[0] + '.csv')
        curr_pdf_file = os.path.join(src_path, filename)

        df_list = tb.read_pdf(curr_pdf_file, pages='all')
        for i, df in enumerate(df_list):

            df.to_csv(curr_csv_file_path, mode='a' ,index=False)  # Save DataFrame as CSV
            
            blank_row = pd.DataFrame([[]])
            blank_row.to_csv(curr_csv_file_path, mode='a', index=False, header=False)
            
        print(f"Converted {i + 1} pages of {filename} and added to {curr_csv_file_path}")


     



#First run downloadscript.py to download the pdf files

year_list = list(range(2024,2018,-1))
# year_list = list(range(2025,2024,-1))
for curr_year in year_list:
    pdf_folder_path = f'./nirf_csv_top100/{curr_year}/pdf'
    csv_folder_path = f'./nirf_csv_top100/{curr_year}/csv_tables'
    os.makedirs(csv_folder_path,exist_ok=True)

    dump_pdf_tables_to_csv(pdf_folder_path,csv_folder_path,verbose=True)
    print('*'*50)
    print(f'Completed conversion of pdf to csv for year {curr_year}')
    print('*'*50)



