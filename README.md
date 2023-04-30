## Welcome

**Muse** is a [wallheaven](https://wallhaven.cc/) client for viewing images and collections and setting your desktop background.

## Features

- List your collections.
- Set your wallpaper.
- Filters Wallheaven's style.
- Slide show: change your wallpaper every specific time.
- See wallpapers in portrait.

## Screenshots

![Screenshot from 2023-04-30 08-09-11](https://user-images.githubusercontent.com/5587538/235359202-67c74813-e584-429f-96f6-eca27c4b1ff7.png)
![Screenshot from 2023-04-30 08-10-09](https://user-images.githubusercontent.com/5587538/235359208-fbebb6bd-4866-44c9-8f56-3ffcd411d3db.png)
![Screenshot from 2023-04-30 08-10-35](https://user-images.githubusercontent.com/5587538/235359213-386d4e3c-9cf4-4458-a181-5d31f396576b.png)
![Screenshot from 2023-04-30 08-29-31](https://user-images.githubusercontent.com/5587538/235359215-26419a63-63d4-4beb-83c7-0591e9ed3104.png)

## How to install

Visit our lastest [realease](https://github.com/CLu1s/muse/releases) and download the package for your OS.

### AppImage

AppImage is a distribution format that does not rely on the system installed packages and instead bundles all dependencies and files needed by the application and can be executed without installation. You just needs to make the file executable (`chmod a+x muse-tauri-app_0.1.1_amd64`) and can then run it (`./muse-tauri-app_0.1.1_amd64`).

## F.A.Q

### Why do you need my API Key?

It is the default method to authenticate your account with Wallheaven, and there is no need to type your password, and the key can be regenerated at any time.

### Why do you need my user name?

According to the API documentation of Wallhaven to list the images from your collection, we use: `/api/<userName>/<collectionID>`. We can get the collection ID just with your API key but not your username :(
