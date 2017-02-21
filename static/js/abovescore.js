(function() {
    var _ = {};
    _.type = function(obj) {
        var types = {
            "[object String]": "STRING",
            "[object Number]": "NUMBER",
            "[object Date]": "DATE",
            "[object Function]": "FUNCTION",
            "[object Array]": "ARRAY",
            "[object Object]": "OBJECT",
            "[object Null]": "NULL",
            "[object Boolean]": "BOOLEAN",
            "[object RegExp]": "REGEXP",
            "[object Undefined]": "UNDEFINED"
        };
        return types[Object.prototype.toString.call(obj)];
    };

    _.isString = function(obj) {
        return _.type(obj) === "STRING";
    };

    _.isStringF = function(obj) {
        return _.type(obj) === "STRING" && obj.trim() != '';
    };

    _.isNumber = function(obj) {
        return _.type(obj) === "NUMBER";
    };

    _.isDate = function(obj) {
        return _.type(obj) === "DATE";
    };

    _.isFunction = function(obj) {
        return _.type(obj) === "FUNCTION";
    };

    _.isArray = function(obj) {
        return _.type(obj) === "ARRAY";
    };

    _.isObject = function(obj) {
        return _.type(obj) === "OBJECT";
    };

    _.isNull = function(obj) {
        return _.type(obj) === "NULL";
    };

    _.isBoolean = function(obj) {
        return _.type(obj) === "BOOLEAN";
    };

    _.isRegExp = function(obj) {
        return _.type(obj) === "REGEXP";
    };

    _.isUndefined = function(obj) {
        return _.type(obj) === "UNDEFINED";
    };

    _.isChildOf = function(child, parent) {
        return child instanceof parent;
    };

    _.Getter = function(k) {
        return this['__'+k];
    };

    _.Setter = function(k, v) {
        if (_.isUndefined(k)) return this;
        if (!_.isUndefined(v) && _.isString(k)) {
            this['__'+k] = v;
            return this;
        }
        var ks = k;
        if (_.isObject(k)) {
            for (var i in ks) this['__'+i] = ks[i];
            return this;
        }
        return this;
    };

    _.Data = function(k, v) {
        if (arguments.length === 1 && _.isString(k)) return _.Getter.call(this, k);
        return _.Setter.call(this, k, v);
    };

    _.GUID = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    };

    _.namespace = function(namespaceStr) {
        var cur = window;
        var ns = namespaceStr.split('.');
        for (var i = 0, len = ns.length; i < len; i++) {
            if (!cur[ns[i]]) cur[ns[i]] = {};
            cur = cur[ns[i]];
        }
    };

    _.tmpl = function(str, data) {
        if (!_.isObject(data) || !_.isString(str)) return str;
        function filter(f, txt, type) {
            var ret = txt;
            switch (f) {
                case 'UPPERCASE':
                    ret = (type == 'STRING') ? txt.toUpperCase() : ret;
                    break;
                case 'REVERSE':
                    ret = (type == 'STRING') ? txt.split('').reverse().join('') : ret;
                    break;
                case 'THOUSAND':
                    ret = (type == 'NUMBER') ? (function() {
                        ret = ret + '';
                        var intPart = ret.split('.')[0];
                        var floatPart = ret.split('.')[1];
                        var res = '';
                        while (intPart.length > 3) {
                            res = ',' + intPart.slice(-3) + res;
                            intPart = intPart.slice(0, intPart.length-3);
                        }
                        if (intPart) res = intPart + res;
                        return res + (floatPart ? '.' + floatPart : '');
                    }()) : ret
                    break;
                default:
                    break;
            }
            return ret;
        }
        str = str.replace(/#{([^}]*)}/g, function(val, replacement) {
            var filters = replacement.split(/\s*\|\s*/g);
            var originText = filters.shift();
            replacement = eval('data.' + originText);
            for (var i in filters) {
                replacement = filter(filters[i], replacement, _.type(replacement));
            }
            return replacement;
        });
        return str;
    };
	
	_.log = function() {
		if (!_.isUndefined(_.log.debug) && _.log.debug == true) console && console.log.apply(console, arguments);
	};
	
    _.support = (function() {
        var div = document.createElement('div'),
        vendors = 'Khtml Ms O Moz Webkit'.split(' '),
        len = vendors.length;

        // prop: css name
        return function(prop) {
            if ( prop in div.style ) return true;

            prop = prop.replace(/^[a-z]/, function(val) {
                return val.toUpperCase();
            });

            while(len--) {
                if ( vendors[len] + prop in div.style ) {
                    // browser supports box-shadow. Do what you need.
                    // Or use a bang (!) to test if the browser doesn't.
                    return true;
                } 
            }
            return false;
        };
 	})();
    
    // @return: Random int number between min and max (min&max are included)
    _.rand = function(min, max) {
        return Math.floor(Math.random() * (max-min+1)) + min;
    };
    
    _.formatDate = function(date, fmt) {
        var dt = new Date(date);
        var o = { 
            "M+" : dt.getMonth()+1,                 //月份 
            "d+" : dt.getDate(),                    //日 
            "h+" : dt.getHours(),                   //小时 
            "m+" : dt.getMinutes(),                 //分 
            "s+" : dt.getSeconds(),                 //秒 
            "q+" : Math.floor((dt.getMonth()+3)/3), //季度 
            "S"  : dt.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length)); 
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); 
            }
        }
        return fmt; 
    }
    var root = typeof exports !== "undefined" && exports !== null ? exports : window;
    root._ = _;

}());
