import js/vue.min.js;
import vue.components.Login;
import vue.components.Child;
class Index{
    func init(dom) {
        var child = new Child();
        console.log(child);
        new Vue({
            el:dom,
            data:{

            },
            components:{
                index:new Login(),
                child:new Child()
            }

        });
    }
}