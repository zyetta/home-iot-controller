docker build -t home-iot-controller .
docker stop homeIotController
docker rm homeIotController
docker run -it --name homeIotController home-iot-controller
