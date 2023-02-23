import os
from PIL import Image

print("Resizing ...")
Files = os.listdir()
Images = []

for File in Files:
    if File.endswith((".png",".jpg")):
        with Image.open(File) as img:
            Width, Height = img.size
            New_Width = Width/2
            New_Height = Height/2
            Command = f"sips -z {New_Height} {New_Width} '{File}' --out '{File}'"
            print(Command)
            os.system(Command)
        




