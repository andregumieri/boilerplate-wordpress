#! /usr/bin/env bash
DBHOST=localhost
DBNAME=vagrant
DBUSER=root
DBPASSWD=root

echo "mysql-server mysql-server/root_password password $DBPASSWD" | debconf-set-selections
echo "mysql-server mysql-server/root_password_again password $DBPASSWD" | debconf-set-selections
echo "phpmyadmin phpmyadmin/dbconfig-install boolean true" | debconf-set-selections
echo "phpmyadmin phpmyadmin/app-password-confirm password $DBPASSWD" | debconf-set-selections
echo "phpmyadmin phpmyadmin/mysql/admin-pass password $DBPASSWD" | debconf-set-selections
echo "phpmyadmin phpmyadmin/mysql/app-pass password $DBPASSWD" | debconf-set-selections
echo "phpmyadmin phpmyadmin/reconfigure-webserver multiselect none" | debconf-set-selections

apt-get update
apt-get -f install
apt-get -y install apache2 php5 mysql-server libapache2-mod-php5 php5-gd php5-mysql php5-cli php5-curl php5-mysql phpmyadmin
cat <<EOF > /etc/apache2/conf-available/vagrant-provision.conf
<Directory /var/www/html/>
	AllowOverride All
</Directory>
EOF
a2enmod rewrite
a2enconf vagrant-provision
service apache2 restart
