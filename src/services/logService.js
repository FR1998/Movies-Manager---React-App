// Raven use sentri
function init(){
    //Raven.config("KEY API", {
   // release: "1-0-0",
   // environment: "development-test"
  //  }).install();
}

function log(error)
{
    console.error(error);
// Raven.captureException(error);
}

export default {
    init,
    log
};