let DEVELOPMENT = true;

export let HOST;

if(DEVELOPMENT) {
  HOST = "http://localhost:8001";
} else {
  HOST = "https://sugarush-blog.herokuapp.com";
}
