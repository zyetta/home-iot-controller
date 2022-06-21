docker build -t home-iot-controller .
docker stop homeIotController
docker rm homeIotController
docker run -d --restart unless-stopped -it --name homeIotController home-iot-controller
