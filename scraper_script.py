from selenium import webdriver
from bs4 import BeautifulSoup
import csv
import os 
import time 
import requests

#pip install selenium
#pip install beautifulsoup4


def download_files(url_to_file,path_dir,filename_str,verbose=False):
    '''
    Download files using the requests HTTP library for fetching data from the web. 
    '''
    file_path = os.path.join(path_dir, filename_str)

    # Send a GET request to download the file
    file_response = requests.get(url_to_file)

    # Save the file to the specified path
    with open(file_path, "wb") as file:
        file.write(file_response.content)
        if verbose:
            print(f"Downloaded: {file_path}")




url_list = [
    'https://www.nirfindia.org/Rankings/2024/EngineeringRanking.html',
    'https://www.nirfindia.org/Rankings/2023/EngineeringRanking.html',
    'https://www.nirfindia.org/Rankings/2022/EngineeringRanking.html',
    'https://www.nirfindia.org/Rankings/2021/EngineeringRanking.html',
    'https://www.nirfindia.org/Rankings/2020/EngineeringRanking.html',
    'https://www.nirfindia.org/Rankings/2019/EngineeringRanking.html',
    # 'https://www.nirfindia.org/Rankings/2018/EngineeringRanking.html',
    # 'https://www.nirfindia.org/Rankings/2017/EngineeringRanking.html',
    # 'https://www.nirfindia.org/Home/engg'
]

# Flags to be set of collecting all data
download_all_pdfs = True # if you want to download all the pdfs
download_all_graphs = False # if you want to download all the graphs (.jpg format) # As on 13-Sep-24, downloaded images via requests.get() are corrupted #need2fix

# i=5
curr_year = 2024
# url = url_list[i]
for i, url in enumerate(url_list):
    print('Fetching top 100 NIRF ranking information for year: {} '.format(curr_year-i))
    for attempt in range(5):
        try:
            driver = webdriver.Chrome()
            driver.get(url)
            html_text = driver.page_source
            driver.quit()
            del driver
            break
        except:
            print("Connection refused. Retrying...")
            time.sleep(2)

    soup = BeautifulSoup(html_text,'lxml')
    rows = soup.select('tr[role="row"].even, tr[role="row"].odd')

    result = []

    for row in rows:
        entries = row.find_all('td')
        anchorText = row.find_all('a')
        if curr_year - i > 2019:
            graphs = [anchorText[2]['href'], anchorText[3]['href']]
        else:
            graphs = [anchorText[2]['href'], anchorText[4]['href']]

        temp = []
        for entry in entries:
            temp.append(entry.contents[0])
        
        temp.append(graphs[0])
        temp.append(graphs[1])

        result.append(temp)

    yearwise_data_dir = 'nirf_csv_top100'
    os.makedirs(yearwise_data_dir, exist_ok=True)

    if download_all_pdfs:
        yearwise_pdf_dir = os.path.join(yearwise_data_dir,f'{curr_year-i}','pdf')
        os.makedirs(yearwise_pdf_dir,exist_ok=True)
    if download_all_graphs:
        yearwise_graph_dir = os.path.join(yearwise_data_dir,f'{curr_year-i}','graph')
        os.makedirs(yearwise_graph_dir,exist_ok=True)

    csv_file_path = os.path.join(yearwise_data_dir,'nirf_top100_{}.csv'.format(curr_year-i))

    # csv_file_path = 'data.csv'
    header = ['Institute ID','Name','TLR(100)','RPC(100)','GO(100)','OI(100)','PERCEPTION(100)','City','State','Score','Rank','Link to PDF','Link to Graph']
    # Open the CSV file in write mode
    with open(csv_file_path, mode='w', newline='') as file:
        # Create a CSV writer object
        writer = csv.writer(file)

        writer.writerow(header)
        # Write the data to the CSV file row by row
        for row in result:
            writer.writerow(row)


            if download_all_pdfs:
                link_to_pdf = row[header.index("Link to PDF")]
                filename_str = f'{row[header.index("Rank")]}_{row[0]}'
                download_files(link_to_pdf,yearwise_pdf_dir,f'{filename_str}.pdf',True)

            if download_all_graphs:
                filename_str = f'{row[header.index("Rank")]}'
                link_to_graph = row[header.index("Link to Graph")]
                download_files(link_to_pdf,yearwise_graph_dir,f'{filename_str}.jpg',True)
            
            # print(f'Downloading: {link_to_pdf}\n {link_to_graph}')


    print('Data has been written to', csv_file_path)
