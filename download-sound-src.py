import requests
import os
from bs4 import BeautifulSoup

BASE_URL = "https://onara-mp3.com/onara{}-{}/"
TARGET_DIR = "./assets/fart-sounds/"

os.makedirs(TARGET_DIR, exist_ok=True)

for i in range(1, 58, 5):
	# fetch page
	url = BASE_URL.format(i, i+4 if i+4 < 58 else 58)
	response = requests.get(url)
	soup = BeautifulSoup(response.content, "html.parser")
	# extract titles
	elements = soup.find_all('span', class_='oomozi')
	titles = [' '.join([elements[j].text, elements[j+1].text]) for j in range(0, len(elements), 2)]
	# extract audio urls
	elements = soup.find_all('audio')
	audio_urls = [element['src'] for element in elements if element.has_attr('src')]
	# download audio files
	for j in range(0, len(titles)):
		file_name = titles[j] + ".mp3"
		file_path = os.path.join(TARGET_DIR, file_name)
		with open(file_path, "wb") as f:
			response = requests.get(audio_urls[j])
			f.write(response.content)

print("\033[92m" + "Download complete!" + "\033[0m")
