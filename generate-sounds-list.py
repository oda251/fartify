import os

TARGET_DIR = "./src/public/sounds"
filelist = []
# get all mp3 files in the target directory
for root, dirs, files in os.walk(TARGET_DIR):
	for file in files:
		if file.endswith('.mp3'):
			# get path from sounds directory
			path = os.path.join(root, file).split('public/')[1]
			# append to the file list
			filelist.append(path)
# write the file list to a json file
with open('./src/sounds-list.json', 'w') as f:
	f.write('{"files":' + str(filelist) + '}')
