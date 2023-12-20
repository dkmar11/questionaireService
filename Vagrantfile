Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"

  config.vm.provision :docker
  config.vm.define "ciserver" do |ci|
    config.vm.provider "virtualbox" do |vb|
      vb.memory = "2054"
    end
    ci.vm.network "private_network", ip: '192.168.56.60'
    ci.vm.hostname = "ciserver"
    ci.vm.provision :file, source:"./docker/docker-compose.ci.yml", destination:"docker-compose.yml"
    ci.vm.provision :docker_compose, yml:"/home/vagrant/docker-compose.yml", run: "always"
    ci.vm.provision :shell, inline: "sudo chmod 777 /var/run/docker.sock"
  end

  # config.vm.define "client" do |ci|
  #   config.vm.provider "virtualbox" do |vb|
  #     vb.memory = "2054"
  #   end
  #   ci.vm.network "private_network", ip: '192.168.56.61'
  #   ci.vm.hostname = "client"
  #   ci.vm.provision :file, source:"../docker/docker-compose.ci.yml", destination:"docker-compose.yml"
  # end
end
