import os
from PIL import Image

print("Resizing ...")
Files = os.listdir()
Images = []

for File in Files:
    if File.endswith((".png",".jpg")):
            File_Head = os.path.splitext(File)[0]
            Command = f"cwebp -q 80 '{File}' -o '{File_Head}.webp'"
            print(Command)
            os.system(Command)
        




