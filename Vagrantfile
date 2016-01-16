# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network :forwarded_port, guest: 80, host: 3040
  config.vm.synced_folder "./www", "/var/www/html", :mount_options => ["dmode=777", "fmode=666"]

  config.vm.provision :shell, :path => "vagrant-provision.sh"
end
