window.dom = {
    create(string) {
        const container = document.createElement('template');
        container.innerHTML = string.trim();
        document.body.appendChild(container.content.firstChild);
        return container.content.firstChild; 
    },
    after(node,node2){
        node2.parentNode.insertBefore(node, node2.nextSibling);
    },
    before(node,node2){
        node2.parentNode.insertBefore(node, node2);
    },
    append(child,parent){
        parent.appendChild(child)
    },
    wrap(parent,child){
        dom.before(parent,child)
        dom.append(child,parent)
    },
    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },
    empty(parent){
       const array = []
       let x = parent.firstChild
       while(x){
           array.push(dom.remove(parent.firstChild))
           x = parent.firstChild
       }
       return array
    },
    attr(node,name,value){
        if(arguments.length===3){
            node.setAttribute(name,value)
        }else if(arguments.length===2){
           return node.getAttribute(name)
        }
    },
    text(node,string){
        if('innerText' in node){
            if(arguments.length===2){
                node.innerText = string
            }else{
                return node.innerText
            }
        }else {
            if(arguments.length===2){
                node.textContent = string
            }else{
                return node.textContent
            }
        }
    },
    html(node,string){
        if(arguments.length===1){
            return node.innerHTML
        }else{
            node.innerHTML = string;
        }
    },
    style(node,name,value){
        if(arguments.length===3){
            node.style[name] = value
        }else if(typeof name=== 'string'){
            return node.style[name]
        }else if(name instanceof Object){
            for(let key in name){
                node.style[key] = name[key]
            }
        }
    },
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.contains(className)
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector,scope){
        return (scope || document).querySelectorAll(selector)
    },
    next(node){
        let x  = node.nextSibling
        while(x && x.nodeType===3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x  = node.previousSibling
        while(x && x.nodeType ===3){
            x = x.previousSibling
        }
        return x
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node)
    },
    each(nodeList,fn){
        for(let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        let i
        for(i=0;i<node.parentNode.children.length;i++){
            while(node.parentNode.children[i]===node){
                return i
            }
        }
    }
}