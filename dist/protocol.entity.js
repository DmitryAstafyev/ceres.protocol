"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tools = require("./tools/index");
const injection_types_primitive_1 = require("./injections/injection.types.primitive");
var EEntityType;
(function (EEntityType) {
    EEntityType["root"] = "root";
    EEntityType["class"] = "class";
    EEntityType["namespace"] = "namespace";
    EEntityType["complex"] = "complex";
    EEntityType["primitive"] = "primitive";
    EEntityType["repeated"] = "repeated";
    EEntityType["reference"] = "reference";
    EEntityType["enum"] = "enum";
})(EEntityType = exports.EEntityType || (exports.EEntityType = {}));
class EntityType {
    constructor() {
        this._types = {};
        const defTypes = Object.assign({}, injection_types_primitive_1.PrimitiveTypes);
        this._types = Object.assign({}, defTypes);
    }
    getTypes() {
        return this._types;
    }
    setAdvancedTypes(advancedTypes) {
        const errors = this._getAdvancedTypeErrors(advancedTypes);
        if (errors instanceof Array) {
            return errors;
        }
        const defTypes = Object.assign({}, injection_types_primitive_1.PrimitiveTypes);
        const adTypes = Object.assign({}, advancedTypes);
        this._types = Object.assign(defTypes, adTypes);
    }
    isPrimitive(type) {
        return this._types[type] !== void 0;
    }
    isClassReference(type) {
        return type[0] === type[0].toUpperCase();
    }
    isRepeated(type) {
        return type.search(/array<.*>/gi) !== -1;
    }
    serializeName(name) {
        return name.replace(/@/gi, '');
    }
    hardSerializeName(name) {
        return name.replace(/@/gi, '').replace(/\?/gi, '');
    }
    isSingle(name) {
        return name.indexOf('@') === 0;
    }
    getRepeatedType(type) {
        return type.replace(/array</gi, '').replace(/>/gi, '');
    }
    getType(prop, target) {
        let error;
        switch (Tools.getTypeOf(target)) {
            case Tools.EPrimitiveTypes.string:
                if (target.trim() === '') {
                    return [new Error(`Definition of type cannot be empty string. Property "${prop}".`)];
                }
                if (this.isRepeated(target)) {
                    const repeatedError = this.getType(prop, this.getRepeatedType(target));
                    if (repeatedError instanceof Array) {
                        return repeatedError;
                    }
                    return EEntityType.repeated;
                }
                if (this.isClassReference(target)) {
                    return EEntityType.reference;
                }
                if (this.isPrimitive(target)) {
                    return EEntityType.primitive;
                }
                return [new Error(`Cannot parse prop "${prop}" due error: unknown primitive / generic type "${target}". Available types: ${Object.keys(this._types).join(', ')}. To define reference to class, use uppercase for the first letter.`)];
            case Tools.EPrimitiveTypes.array:
                error = this._getEnumError(target);
                return error === null ? EEntityType.enum : [new Error(`Cannot parse prop "${prop}" due error: ${error.message}`)];
            case Tools.EPrimitiveTypes.object:
                const types = {};
                const errors = [];
                Object.keys(target).forEach((nestedProp) => {
                    const type = this.getType(nestedProp, target[nestedProp]);
                    if (type instanceof Array) {
                        errors.push(...type);
                    }
                    else {
                        types[type] = true;
                    }
                });
                if (errors.length > 0) {
                    return errors;
                }
                let isClass = true;
                let isComplex = true;
                Object.keys(types).forEach((key) => {
                    if (key !== EEntityType.primitive && key !== EEntityType.reference && key !== EEntityType.repeated) {
                        isClass = false;
                    }
                    if (key !== EEntityType.primitive && key !== EEntityType.reference && key !== EEntityType.repeated && key !== EEntityType.enum) {
                        isComplex = false;
                    }
                });
                if (isClass) {
                    return EEntityType.class;
                }
                if (isComplex) {
                    return EEntityType.complex;
                }
                return EEntityType.namespace;
        }
        return [new Error(`Prop "${prop}" has unexpected type: ${Tools.getTypeOf(target)}. Allowed types: string, object, array<string>.`)];
    }
    getInjections() {
        let injections = '';
        Object.keys(this._types).forEach((alias) => {
            const type = this._types[alias];
            if (Tools.getTypeOf(type.implementation) === Tools.EPrimitiveTypes.function) {
                injections += type.implementation.toString() + '\n';
            }
        });
        if (injections !== '') {
            injections =
                '/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n' +
                    '* Primitive type injections\n' +
                    '* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n' +
                    injections;
        }
        return injections;
    }
    _getAdvancedTypeErrors(advancedTypes) {
        if (typeof advancedTypes !== 'object' || advancedTypes === null) {
            return [new Error(`Expecting as advanced types - object: {[key: string]: any }.`)];
        }
        const errors = [];
        const props = {
            init: 'string',
            parse: 'function',
            serialize: 'function',
            tsType: 'string',
            validate: 'function',
        };
        const optional = {
            implementation: 'function',
        };
        Object.keys(advancedTypes).forEach((key) => {
            const type = advancedTypes[key];
            if (injection_types_primitive_1.PrimitiveTypes[key] !== void 0) {
                return errors.push(new Error(`Type with alias "${key}" is defined on default level.`));
            }
            Object.keys(props).forEach((prop) => {
                if (typeof type[prop] !== props[prop]) {
                    return errors.push(new Error(`Type with alias "${key}" has wrong type of property "${prop}". Expected type is {${props[prop]}}, but gotten: "${(typeof type[prop])}" .`));
                }
            });
            Object.keys(optional).forEach((prop) => {
                if (type[prop] !== void 0 && typeof type[prop] !== props[prop]) {
                    return errors.push(new Error(`Type with alias "${key}" has wrong type of property "${prop}". Expected type is {${props[prop]}}, but gotten: "${(typeof type[prop])}" .`));
                }
            });
        });
        return errors.length > 0 ? errors : undefined;
    }
    _getEnumError(target) {
        if (!(target instanceof Array)) {
            return new Error(`As enum type expected an array<string>, but gotten: ${Tools.inspect(target)}`);
        }
        try {
            target.forEach((value) => {
                if (Tools.getTypeOf(value) !== Tools.EPrimitiveTypes.string) {
                    throw new Error(`As enum type expected an array<string>, but gotten: ${Tools.inspect(target)}`);
                }
                if (value.trim() === '') {
                    throw new Error(`Value of enum cannot be empty string. Enum: ${Tools.inspect(target)}`);
                }
            });
        }
        catch (e) {
            return e;
        }
        return null;
    }
}
exports.EntityType = EntityType;
//# sourceMappingURL=protocol.entity.js.map