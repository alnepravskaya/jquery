let JObject = function (elems) {
	for (var i in JObject.prototype) {
		if (JObject.prototype.hasOwnProperty(i)) {
			elems.__proto__[i] = JObject.prototype[i];
		}
	}
	elems.constructor = JObject;
	return elems;
};

JObject.prototype = {
	addClass: function (clName) {
	if(typeof clName=="function"){
		this.each(function (i, elem){
			let res=clName(i, elem.className).split(" ")||"";
			for (let k = 0; k < res.length; k++) {
				elem.classList.add(res[k]);
			}
		});
	}else {
		let arrClass = clName.split(" ");
		this.each(function (i, elem) {
			for (let k = 0; k < arrClass.length; k++) {
				elem.classList.add(arrClass[k]);
			}
		});
	}
	return this;


	},
	each: function (func) {
		for (let i = 0; i < this.length; i++) {
			func.call(this[i], i, this[i]);
		}
		return this;
	},
	html: function (param) {
		if (param == undefined) {
			this[0] ? this[0].innerHTML : undefined;

		} else {
			this.each(function (i, elem) {
				elem.innerHTML = param;
			});
		}
		return this;
	},
	append: function () {
		if (typeof arguments[0] == "function") {

			this.each((i, elem)=> {
				let res = arguments[0](i, elem.innerHTML);
				if (typeof  res == 'string') {
					elem.innerHTML += res;
				} else {
					elem.append(res);
				}

			});
		} else {
			for (let j = 0; j < arguments.length; j++) {
				if (arguments[j].constructor == JObject) {
					for (let k = 0; k < arguments[j].length; k++) {
						this.each((i, elem)=>elem.appendChild(arguments[j][k]));
					}
				} else {
					if (typeof  arguments[j] == 'string') {
						this.each((i, elem)=>elem.innerHTML += (arguments[j]));
					} else {
						this.each((i, elem)=>elem.appendChild(arguments[j]));
					}
				}
			}
		}
		return this;
	},
	attr: function (name, value) {
		if (typeof name == 'object') {
			this.each(function (i, elem) {
				for (var key in name) {
					elem.setAttribute(key, name[key]);
				}
			})

		}
		if (arguments.length == 2) {
			if (typeof value == 'function') {
				let res = this[0].getAttribute(name) || undefined;
				this.each(function (i, elem) {
					let val = value(i, res);
					elem.setAttribute(name, val);
				})
			} else {
				this.each(function (i, elem) {
					elem.setAttribute(name, value);
				})
			}
		} else {
			return this[0].getAttribute(name);
		}
		return this;
	},
	children: function (sel) {
		let res = sel ? sel : '*';
		return this[0].querySelectorAll(':scope >' + res);
	},
	css: function (name, value) {
		if (Array.isArray(name)) {
			var obj={};
			for(let i=0; i<name.length; i++){
				obj[name[i]]=this[0].style[name[i]];
			}
			return obj;
		}
		if (typeof name == 'object') {
			this.each(function (i, elem) {
				for (var key in name) {
					elem.style[key] = name[key];
				}
			})

		}
		if (arguments.length == 2) {
			if (typeof value == 'function') {
				this.each(function (i, elem) {
					let res = elem.style[name];
					elem.style[name] = value(i, res);
				})
			} else {
				this.each(function (i, elem) {
					elem.style[name] = value;
				})
			}
		} else {
			return this[0].style[name];
		}
		return this;
	},
	on:function(event,f1,f2){
		if(f2==undefined){
			this.each(function (i, elem) {
				elem.addEventListener(event,f1);
			})
		}else{
			this.each(function (i, elem) {
				elem.addEventListener(event,function (e) {
					if(Array.from(elem.querySelectorAll(f1)).indexOf(e.target)!=-1){
						f2(e);
					}
				});
			})
		}
		return this;
	},
	one:function (event,f1) {
		this.each(function (i, elem) {
			let fun=function(e){
				f1(e);
				elem.removeEventListener(event,fun);
			};
			elem.addEventListener(event,fun);
		})
		return  this;
	},
	data:function(name,value){
		if (typeof name == 'object') {
			this.each(function (i, elem) {
				for (var key in name) {
					elem.dataset[key]= name[key];
				}
			});
			return this;
		}
		if (arguments.length == 2) {
			this.each(function (i, elem) {
				elem.dataset[name]= value;
			})
		} else if(arguments.length == 1){
			return this[0].dataset[name];
		} else if (arguments.length == 0){
			return  this[0].dataset;
		}
		return this;
	},
	trigger:function (event) {
		this.each(function (i, elem) {
			let e= new Event(event);
			e.target=elem;
			elem.dispatchEvent(e);
		})
		return  this;
	}

	
};

$ = function (selector) {
	let elems = document.querySelectorAll(selector);
	return new JObject(elems);
};

