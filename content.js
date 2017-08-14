(function(){
    var arrow, arrowPos = -1;

    var up = function(){
        move(1);
    };

    var down = function(){
        move(-1);
    };

    var isInView = function(node){
        var rect = node.getBoundingClientRect();
        return node === document.elementFromPoint(rect.left, rect.top);
    };

    var moveArrow = function(node){
        if( !arrow ){
            arrow = document.body.appendChild(document.createElement("div"));
            arrow.classList.add("fake-arrow");
        }
        var appendNode = node.parentNode.parentNode.parentNode.parentNode;
        appendNode.style.position = "relative";
        appendNode.appendChild(arrow);
        if(!isInView(appendNode)){
            scrollTo( 0, appendNode.offsetTop );
        }
    };
    var move = function(no){
        var nodes = document.querySelectorAll("h3.r a");
        var nextPos = arrowPos+no;
        var pos = nextPos < 0 ? 0 : nextPos > nodes.length-1 ? nodes.length-1 : nextPos;
        moveArrow(nodes[pos]);
        arrowPos = pos;
    };

    var open = function(){
        var nodes = document.querySelectorAll("h3.r a");
        nodes[arrowPos].click();
    };

    var focus = function(){
        arrowPos = -1;//reset
        var input = document.getElementById("lst-ib");
        input.focus();
    };

    // control
    var keyHandler = function(eve){
		var node = eve.target;
        if( node.nodeType === 1 && !/INPUT|TEXTAREA/.test(node.tagName.toUpperCase()) ){
            switch(eve.keyCode){
                case 13:
                    eve.preventDefault();
                    open();
                    break;
                case 74:
                    eve.preventDefault();
                    up();
                    break;
                case 75:
                    eve.preventDefault();
                    down();
                    break;
                case 191:
                    eve.preventDefault();
                    focus();
                    break;
                default:
                    break;
            }
        }
    };


    // Entry Point
    document.addEventListener("keydown", keyHandler, false );
})();
