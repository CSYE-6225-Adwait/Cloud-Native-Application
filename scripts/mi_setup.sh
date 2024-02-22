#!/bin/bash

sudo dnf update

sudo dnf install -y unzip

# Install Node.js and npm
sudo dnf module install -y nodejs:20
node -v
# Install MySQL
sudo dnf install -y mysql-server

# Start MySQL service
sudo systemctl start mysqld

# Enable MySQL service on boot
sudo systemctl enable mysqld

sudo mysql --connect-expired-password -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';"

sudo adduser csye6225 --user-group --shell /usr/sbin/nologin

ls -al

sudo mkdir -p /opt/app

ls -al

sudo unzip -o /tmp/webapp.zip -d /opt/app

sudo rm /tmp/webapp.zip

sudo chown -R csye6225:csye6225 /opt/app

cd /opt/app/

ls -al

sudo npm i --no-progress

sudo cp /tmp/systemd.service /etc/systemd/system/csye6225.service

sudo systemctl daemon-reload

sudo systemctl enable csye6225.service


#packer build -var 'DB_PASSWORD=Newpass@24' -var 'DB_USERNAME=userr' gcp.pkr.hcl