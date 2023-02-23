import os

print("Resizing ...")
Files = os.listdir()
Images = []

for File in Files:
    if File.endswith((".png",".jpg")):
        Command = f"sips -z 100 100 '{File}' --out '{File}'"
        print(Command)
        os.system(Command)
        




