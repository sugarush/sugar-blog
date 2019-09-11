let DEVELOPMENT = false;

export let HOST;

if(DEVELOPMENT) {
  HOST = "http://localhost:8001";
} else {
  HOST = "http://192.168.99.100:8001";
}
