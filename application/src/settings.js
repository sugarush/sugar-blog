let DEVELOPMENT = true;

export let HOST;

if(DEVELOPMENT) {
  HOST = "http://localhost:8001";
} else {
  HOST = "http://sugarush-blog.herokuapp.com";
}
