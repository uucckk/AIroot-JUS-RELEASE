class Login{
    var template = "<div>{{message}}</div>";
    function data(){
        return {
            message:getMessage()
        }
    }

    function getMessage(){
        return "I'm function";
    }
}