//01-MODULOS INDIVIDUALES MODULO CONTROLADOR })();
var controladorPresupuesto = (function () {

    var Gastos = function (id, descri, valor) {

        this.id = id;
        this.descri = descri;
        this.valor = valor;
    };

    var Ingreso = function (id, descri, valor) {

        this.id = id;
        this.descri = descri;
        this.valor = valor;
    };

    var data = {

        todoslosItems: {
            income: [],
            expence: []

        },
        totales: {
            income: 0,
            expence: 0

        }

    };
    /// Aqui estamos recibiendo la informaciòn incial de la app
    return {
        agreItem: function (ty, des, val) {
            var nuevoItem, ID;
            // ID es un codigo que agregamos a cad gasto o ingreso 
            // Nuevo ID 
            // Item actual        // ultimo item -1 es porque comienza el connteo desde 0, y a  eso le agregamos 1 para que aumennte la numeraciòn del ID 

            if (data.todoslosItems[ty].length > 0) {
                ID = data.todoslosItems[ty][data.todoslosItems[ty].length - 1].id + 1;

            } else {
                ID = 0;
            }


            // Creamos unn nuevo Item desde la info ingresada. 
            if (ty === 'income') {
                nuevoItem = new Ingreso(ID, des, val);
            } else if (ty === 'expence') {
                nuevoItem = new Gasto(ID, des, val);
            }
            // Agregamos al array los datos ingresados segun sean si es un inncome o expence        
            data.todoslosItems[ty].push(nuevoItem);
            // Para que tengamos acceso a el objeto que acabamos de crear 
            return nuevoItem;

        },
        testing: function () {
            console.log(data);
        }
    };

    //some code

})();
//02-MODULO CONNTROLADOR INTERFAS USUARIO })();
var controladorUI = (function () {

    var DOMclasshtml = {

        entradaTipo: '.add__type',
        entradaDescripcion: '.add__description',
        entradaDinero: '.add__value',
        entradaboton: '.add__btn',

    }


    return {
        // funcion que recibe el tipo de valor, la descripciòn y dinero. 
        tomarinfoentrada: function () {
            return {
                tipo: document.querySelector(DOMclasshtml.entradaTipo).value, // Recibimos inc(+) or exp(-) 
                descripcion: document.querySelector(DOMclasshtml.entradaDescripcion).value, // Recibimos el texto descripciòn
                dinero: document.querySelector(DOMclasshtml.entradaDinero).value, // recibimos el valor 
                // Esto es unn objeto que devuelve las tres propiedades 
            };
        },
        
        agregarListaItem: function(obj,type) {
            var html;
            // 01- Crear html 
            
            if (type === 'income') {
             html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%descri%</div><div class="right clearfix"><div class="item__value">%valor%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';   
            } else if {
             html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%descri%</div><div class="right clearfix"><div class="item__value">%valor%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';   
            }
            
            newhtml = newhtmlhtml.replace('%id%', obj.id);
            newhtml = newhtmlhtml.replace('%descri%', obj.descri);
            newhtml = newhtml.replace('%valor%', obj.valor;
            
            
            // Remplazar el html con el cambio de info
            
            
            
            
            
            // Insertar el html en el DOM 
            
            
            
            
        },
        
        
        
        
        
        ///Con esto hacemos el DOM publico para que sea consultado por otros metodos. 
        tomarDOM: function () {
            return DOMclasshtml;
        }


    };

    //some code



})();

//03-MODULO CONTROLADOR APP PRINCIPAL
var controladorApp = (function (contPresupuesto, contUI) {

    var configEventListener = function () {
        var DOM = controladorUI.tomarDOM(); // Tengo que poner los parentesis al final ya que esta haciedo una llamada.    
        //Seleccionamos el boton añadir con class del boton html que en este caso es .add__btn, luego le agregamos un escuchador de eventos para que ocurra algo cuando suceda el evento en este caso un click y luego la funcion que queremos que ejecute.  
        // evento para el click en el botonn add, hace lo que este escrito en cotnrolAddBoton
        document.querySelector(DOM.entradaboton).addEventListener('click', controlAddBoton);
        /// Evento para la tecla enter  hace lo que este escrito en cotnrolAddBoton  
        document.addEventListener('keypress', function (evento) {
            // 13 es el codigo de la tecla enter, asi solo funciona al presionar enter, keycode hace referencia ala tecla, en los navegadores viejos utilizan el comando which asi que utilziamos || que es or para decir que funcione en cualquiera de los dos casos. 
            if (evento.keyCode === 13 || evento.which === 13) {
                controlAddBoton();
            }

        });
    }



    var controlAddBoton = function () {
        var entrada, nuevoItem;
        // Cuando alguien haga click en el boton + necesitamos

        // 01. Conseguir la info de entrada
        // Con esta variable conectamos la funciòn de entrada de tezto con este modulo. 
        entrada = controladorUI.tomarinfoentrada();


        // 02. Agregar el item a el conntrolador de presupuesto
        // Llamamos el metodo agreItem de el Modulo Controlador de Presupuesto.
        nuevoItem = controladorPresupuesto.agreItem(entrada.tipo, entrada.descripcion, entrada.dinero);


        // 03. Agregar el item a  UI para verlo.


        // 04. Calcular el presupuesto.




        // 05. Mostrar el Presupuesto en UI para verlo. 

    };
    // Funciòn publica de iniciaciòn. Para iniciar los Event Listennner 
    return {
        init: function () {
            console.log('La aplicaciòn se inicio');
            configEventListener();
        }
    }

    //Estos dos le dice que contPresupuesto es igual a  ControladorPresupuesto y ContUI es controladorUI a nivel externo. Asi queda conectado con los dos modulos exteriores 01 y 02.   
})(controladorPresupuesto, controladorUI);

//LLamamos a init desde el exterior para iniciar la app 
controladorApp.init();
