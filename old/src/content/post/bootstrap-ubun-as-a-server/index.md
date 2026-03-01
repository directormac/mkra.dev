---
title: Bootstrap ubuntu as a server
description: Installing all the needed for home baked services
publishDate: 12 July 2023
coverImage:
  src: ./cover.png
  alt: ubuntu-server
tags:
  - docker
  - server
---
> Disclaimer this is a long guide, you might want to drink coffee first

Used proxmox add additional notes into installing on other physical devices / vm

## Downloading Ubuntu

We are not savages so we are gonna use the LTS version, feel free to use other versions
as of the date of this writing the latest is **Ubuntu Server 22.04.2 LTS**

Go to this [page](https://ubuntu.com/download/server)

Click on the download button an ISO file will be downloaded for you.

Things to do when download is completed

- Link will be added here in the future after i write a specific guide using the following
- Bootable Flashdrive for physical installation
- VM using VMWare or VirtualBox
- Promox Instance

---

## Installing Ubuntu Server

1. Start the machine
2. Boot into the installation medium
3. Detailed steps and screens are provided below

<details><summary>First Screen</summary>
  Select `*Try or Install Ubuntu Server` press `enter`

![grub](./grub.png)

 </details>

<details><summary>Ubuntu Live Boot</summary>

Wait for the live boot to finish

![aftergrub](./aftergrub.png)

</details>

<details><summary>Select Language</summary>

Select desired language, this is different from setting your `locale`

![languageselect](./languageselect.png)

</details>

<details><summary>Installer Update</summary>

The installer will update itself, feel free to skip this part
use the arrow keys to navigate to `Continue without updating` and press `enter`

![installerupdate](./languageselect.png)

</details>

<details><summary>Selecting Keyboard Layout</summary>

Keyboard layout most of the keyboard that are in PH is `English(US/QWERTY)`

![keyboardlayout](./keyboardlayout.png)

</details>

<details><summary>Ubuntu Selection</summary>

Select `Ubuntu Server`

![ubuntuselection](./ubuntuselection.png)

</details>

<details><summary>Network Connection</summary>

As of this example my network is under `192.168.110.0/24` subnet, thats why my dhcp
address in the screen is `192.168.110.85/24` yours might be `192.168.1.x/24` the most
common subnets for home routers, if you dont know what you are doing skip the next
part and just click done on this part, the next part is about manually asigning
and ipv4 address.

![networkconnections](./networkconnections.png)

</details>

<details><summary>Static IP Assignment</summary>

1. Navigate to the ether port using arrow keys press `enter` then go to `edit`

![staticipmenu](./staticipmenu.png)

2. A new popup below will show you what `IPv4 Method` you want to use press `enter`, you are in this section
   so select `Manual`

![ipv4method](./ipv4method.png)

![ipv4methodmanual](./ipv4methodmanual.png)

3. A new popup with the following labels `Subnet , Address, Gateway, Name servers, Search domains`

- Subnet e.g `192.168.1.0/24` if you dont understand it [click here](https://letmegooglethat.com/?q=subnet)
- Address e.g `192.168.1.137` you can replace 137, you dont know what it is? [click here](https://letmegooglethat.com/?q=ipv4+address)
- Gateway e.g `192.168.1.1` your router address, for more info [click here](https://letmegooglethat.com/?q=what+is+my+gateway)
- Name servers e.g `8.8.8.8` is google's public dns `1.1.1.1` is cloudflare
  enter multitple with comma `8.8.8.8,8.8.8.4` or `1.1.1.1,1.1.1.4`

![ipv4methodset](./ipv4methodset.png)

For reference here is what i entered while doing this guide

![ipv4methodexplain](./ipv4methodexplain.png)

</details>

<details><summary>Network Setup Done</summary>

![ipv4methoddone](./ipv4methoddone.png)

</details>

<details><summary>Setup Proxy</summary>

This is not in the scope of this guide so [click here](https://letmegooglethat.com/?q=proxy)

![proxy](./proxy.png)

</details>

<details><summary>Setup Mirror</summary>

Mirror is where we download packages from a certain server when we do something like `apt install neovim`
if you are not using any vpn, the installer will detect and give us ph server as default

![mirror](./mirror.png)

</details>

<details><summary>Storage</summary>

I will not dive deep into this but this is basically where you set your storage size and partition
depending on what machine you are doing this from it will show the hardisk in your system in this demo
i allocated `32gb` of storage space and i will use it all, in your case if you are on a physical machine
partition it well or use the entire ssd there is also an encryption option its up to you wether you want
the data of this system encrypted or not press `enter`

![storage](./storageconfig.png)

</details>

<details><summary>Storage Configuration</summary>

This screen shows you how ubuntu assigns 3 partitions, sizes will depend on your storage medium used for the
installation.

- `partition 1` is for the `BIOS/UEFI` grub `1MB`
- `partition 2` is for the `/boot` `2GB`
- `partition 3` is where your system files and `/home/yourusername` will be stored `29.997GB`

</details>

<details><summary>Finish storage setup</summary>

If you are fine with the default settings ubuntu installer did `Confirm` and `Continue`
this will format your `storage` medium.

![storagedone](./storagedone.png)

</details>

<details><summary>Setup Profile</summary>

Fill up the following

- `Your name` e.g `Bruce Wayne` you can literally put anything here
- `Server name` e.g `bat-server_73` this is how other machines recognize your machine aside from its MAC and IP addresses
- `Username` e.g `batman` this is important as you will use this to ssh e.g `ssh batman@192.168.110.133`
- `Password` e.g `iambatman` choose a secure password

</details>

<details><summary>Fill up Profile</summary>

![profile](./profiledone.png)

</details>

<details><summary>Ubuntu Pro</summary>

Well if you can afford why not?

![ubuntupro](./ubuntupro.png)

</details>

<details><summary>Open SSH</summary>

Install it as we are gonna use OpenSSH server to connect and do more with our server

![openssh](./openssh.png)
![opensshcheck](./opensshcheck.png)

</details>

<details><summary>Featured Snaps</summary>

In this screen we wont install anything as we will dockerize services like `nextcloud`

![featuredsnaps](./featuredsnaps.png)

</details>

<details><summary>Install Complete</summary>

Now the wait begins as get a cup of coffee, depending on how old your installer is the update
will take long, `Reboot` after it is done!

![complete](./complete.png)
![completelog](./completelog.png)
![completereboot](./completereboot.png)

</details>

## Your first boot

<details><summary>First Boot</summary>

The machine is now ready to be hacked!

![firstboot](./firstboot.png)

![ready](./ready.png)

</details>

## Connecting to our server

<details><summary>SSH Login</summary>

Open a terminal in your workstation and connect through ssh

depending on what username and ipaddress of your server is assuming that you are on the same network
you can use this command to connect to the server
`ssh username@ipv4address`

a password will be asked

```sh
ssh batman@1192.168.110.133
```

![sshlogin](./sshlogin.png)

</details>

## Updating our server

<details><summary>First update</summary>

on your terminal update your server with the following commands
these are 2 commands for just checking updates use `sudo apt update` these updates and references the list of packages
you have installed if a new version is released, `sudo apt upgrade` upgrade all the packages

```sh
sudo apt update && sudo apt upgrade
```

After entering the command you will be prompted with `Y/n` if you want to upgrade enter `Y` and `enter`

Depending on how heavy the update is and whether it affects services a screen will appear in your terminal
like the one below

![afterupgrade](./afterupgrade.png)

</details>

---

# Installing Docker and Portainer

open your terminal copy paste the entire snippet and run it

```sh
sudo apt-get install ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
 "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
 "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
 sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose
```

<details><summary>Terminal Output</summary>

![installdocker](./installdocker.png)

![installdockerdone](./installdockerdone.png)

</details>

Checking docker installation

```sh
sudo docker ps
```

![installdockerps](./installdockerps.png)

Additional docker commands to add you the `$USER` so you dont need to sudo docker commands anymore

```sh
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

### Installing Portainer

The following command does the following for us

- downloads the latest portainer image
- sets the container to restart always on failure
- exposes port 9000 for http where we can access our portainer web page later at `192.168.110.133:9000`
- adds volumes for its dependencies
- check the docs if you want to deploy it on https port on 9443

```sh
sudo docker run -d -p 8000:8000 -p 9443:9443 -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

![portainerrun](./portainerrun.png)

After succesful installation we can now access the web page
in your browser go to `assignedIpv4:9000` replace ipv4 to whatever your dhcp server assigned to your server
or whatever you set statically

![portainerhome](./portainerhome.png)
Setup your account where it needs username and password after that login and add a welcome screen appears

![portainerwelcome](./portainerwelcome.png)
Click Home and you are presented with your local docker instance

Click live connect and you will be navigated to your local instance dashboard

![portainerdashboard](./portainerdashboard.png)

Go to app templates and feel free to install any template you want a good example would be `File Browser`
i havent used it myself but basically you can navigate your server files and folders in through your web browser

## Installing Postgres and PgAdmin4

Before proceeding we can check that on our `docker ps` command portainer exists and is running well

```sh
docker ps
```

![portainerup](./portainerup.png)

No we can start installing PostgresSQL and PgAdmin4 there are 2 ways we can install
The first option is below

### First option

1. Create a docker volume where postgres sql db file will be persisted

```sh
sudo docker volume create postgresqldata
```

2. Postgres Installation

- This downloads the postgres image from docker repository/registry
- Uses the volume we created earlier with `/data/db` location
- Exposes the `5432` port, postgres defalt port, allows us to connect to postgres through `192.168.110.133:5432` this address
- Default username is `postgres` we set the password to `postgres` feel free to replace it

```sh
sudo docker run -d -v postgresqldata:/data/db -e POSTGRES_PASSWORD=postgres --name postgres -p 5432:5432 postgres
```

3. Install and run docker named pgadmin, replace `mac@mkra.dev` and `somethingsecret` with your email and desired password

- This downloads the dpage/pgadmin4 image from docker repository/registry
- Exposes the `8080` port, the default port is 80, but we can use that default http port for something else
- We can access the web page through `192.168.110.8080` feel free to use other ports
- replace `mac@mkra.dev` and `somethingsecret` with your email and desired password

```sh
sudo docker run --name pgadmin -e "PGADMIN_DEFAULT_EMAIL=mac@mkra.dev" -e "PGADMIN_DEFAULT_PASSWORD=somethingsecret" -p 8080:80 -d dpage/pgadmin4
```

![postgresrun](./postgresrun.png)

4. Connect them together

```sh
sudo docker network create --driver bridge pgnetwork
sudo docker network connect pgnetwork pgadmin
sudo docker network connect pgnetwork postgres
# check network bridge
docker network inspect pgnetwork
```

![posgresnetwork](./postgresnetwork.png)

5. Additional optins on portainer settings we could have done it on the commands above but
   i want to show you how to use the portainer also

   - Navigate and login to your portainer web page e.g `192.168.110.133:9000`
   - Live connect to your local instance check containers and you will see the following

     ![postgrescontainer](./postgrescontainer.png)

   - if You cant see the Published Ports of the container we created you did something wrong!
   - Click on the container `postgres` and if you scroll down you will see `Container details`
   - On `RESTART_POLICIES` where the default is set to `none` change it to _`always`_

     ![postgresrestart](./postgresrestart.png)

   - Do the same thing with `pgadmin` container

### Second Option

Docker compose

```yaml
version: '3.9'

services:
  pg:
    container_name: postgres
    image: postgres
    # automatically restarts the container - Docker daemon on restart or
    # the container itself is manually restarted
    restart: always
    volumes:
      - postgresqldata:/data/db

    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    ports:
      - '5432:5432'
    networks:
      - bridge
      - pgnetwork

  pgadmin:
    container_name: pgadmin4
    image: dpage/pgadmin4
    restart: always

    environment:
      PGADMIN_DEFAULT_EMAIL: root@root.com
      PGADMIN_DEFAULT_PASSWORD: root

    ports:
      - '8080:80'
    networks:
      - bridge
      - pgnetwork

volumes:
  postgresqldata:

networks:
  bridge:
  pgnetwork:
```

Create a `docker-compose.yaml` anywhere in your home directory for me i store my `docker-compose` files at `composers`

in the directory where you created your `docker-compose.yaml` enter the following commands

```sh
docker compose up
```

## Additional runtime dependencies needed

- build-essentials and cmake
- nvm(Node Version Manager)

```sh

sudo apt install build-essentials cmake zsh
type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

clone dotfiles
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

```

