"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_entity_1 = require("./protocol.entity");
const protocol_injections_1 = require("./protocol.injections");
const Path = require("path");
const Tools = require("./tools/index");
const DEFAULT_INJECTIONS = [
    './injections/injection.convertor.ts',
    './injections/injection.packager.ts',
    './injections/injection.root.ts',
    './injections/injection.types.primitive.ts',
];
class Convertor {
    constructor() {
        this._requestFields = {
            Request: 'Request',
            Response: 'Response',
            Responses: 'Responses',
        };
        this._logger = new Tools.Logger('Protocol.Convertor');
        this._entityType = new protocol_entity_1.EntityType();
        this._version = '';
        this._entities = {};
        this._injections = new protocol_injections_1.Injections();
        this._map = {};
        this._keysMapLeft = {};
        this._keysMapRight = {};
        this._typedMap = {};
    }
    convert(JSON, injections = [], adTypes = null) {
        return new Promise((resolve, reject) => {
            // Assign advanced types
            if (adTypes !== null) {
                const errors = this._entityType.setAdvancedTypes(adTypes.implementation);
                if (errors instanceof Array) {
                    const message = errors.map((error) => {
                        return `\t- ${error.message}`;
                    }).join('\n');
                    return reject(new Error(this._logger.error(`Cannot conver protocol due error(s):\n${message}`)));
                }
                // Add to injections
                injections.unshift(Path.join(__dirname, adTypes.path));
            }
            // Get base
            let base = '';
            try {
                base = this._getBase(JSON);
            }
            catch (error) {
                return reject(error);
            }
            // Get injections
            injections.unshift(...(DEFAULT_INJECTIONS.map((file) => {
                return Path.join(__dirname, file);
            })));
            this._injections.get(injections).then((readyInjections) => {
                let injectStr = '';
                // Validate advanced type injection
                if (adTypes !== null) {
                    let error;
                    readyInjections.forEach((injection) => {
                        if (adTypes.path.indexOf(injection.file) !== -1) {
                            if (injection.content.indexOf('export const AdvancedTypes:') === -1) {
                                error = new Error(`TS file with implementation of advanced types doesn't have definition for it. Expected: "export const AdvancedTypes"`);
                            }
                        }
                    });
                    if (error instanceof Error) {
                        return reject(error);
                    }
                }
                else {
                    // Inject empty AdvancedTypes declaration
                    injectStr += `\texport const AdvancedTypes: {[key: string]: any} = {};\n`;
                }
                readyInjections.forEach((injection) => {
                    injectStr +=
                        '\t/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n' +
                            `\t* Injection: ${injection.file}\n` +
                            '\t* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n' +
                            injection.content.split(/[\n\r]/gi).map((row) => `\t${row}`).join('\n') +
                            '\n';
                });
                const lints = '/* tslint:disable */\n';
                let greeting = '';
                greeting += `/*\n`;
                greeting += `* This file generated automaticaly (${(new Date()).toString()})\n`;
                greeting += `* Do not remove or change this code.\n`;
                greeting += `* Protocol version: ${this._version}\n`;
                greeting += `*/\n\n`;
                let protocolNamespace = '';
                protocolNamespace += `export namespace Protocol {\n`;
                protocolNamespace += this._getTypes() + '\n';
                protocolNamespace += this._getKeysMaps() + '\n';
                protocolNamespace += this._getTypedMap() + '\n';
                protocolNamespace += injectStr + '\n';
                protocolNamespace += this._getMap() + '\n';
                protocolNamespace += this._getProtocolSignature() + '\n';
                protocolNamespace += '}\n';
                base = lints + greeting + protocolNamespace + base + '\n';
                base += this._getGlobalExport();
                base += this._getInitialization();
                resolve(base);
            }).catch((errors) => {
                errors instanceof Error && (errors = [errors]);
                const message = errors.map((error) => {
                    return `\t- ${error.message}`;
                }).join('\n');
                reject(new Error(this._logger.error(`Cannot conver protocol due error(s):\n${message}`)));
            });
        });
    }
    _getBase(JSON) {
        if (Tools.getTypeOf(JSON) !== Tools.EPrimitiveTypes.object) {
            throw new Error(this._logger.error(`Expecting object to convert to a protocol implemenation. Gotten: ${Tools.getTypeOf(JSON)}`));
        }
        if (Object.keys(JSON).length < 1) {
            throw new Error(this._logger.error(`No properties found in target JSON.`));
        }
        if (Tools.getTypeOf(JSON.version) !== Tools.EPrimitiveTypes.string || JSON.version.trim() === '') {
            throw new Error(this._logger.error(`Root level of protocol should have property "version" {string}.`));
        }
        this._version = JSON.version;
        delete JSON.version;
        this._entities.root = {
            children: {},
            name: 'root',
            parent: null,
            request: false,
            single: true,
            type: protocol_entity_1.EEntityType.root,
            value: JSON,
        };
        this._restoreStructure(JSON);
        this._getEntities(this._entities.root, JSON);
        this._validateEntities(this._entities.root);
        return this._entityType.getInjections()
            + '\n'
            + this._getImplementation(this._entities.root);
    }
    _isTargetRequest(target) {
        let isRequest = false;
        if (Tools.getTypeOf(target) !== Tools.EPrimitiveTypes.object) {
            return false;
        }
        Object.keys(target).forEach((key) => {
            this._requestFields[key] !== void 0 && (isRequest = true);
        });
        return isRequest;
    }
    _restoreStructure(target) {
        const isRequest = this._isTargetRequest(target);
        if (isRequest) {
            target[this._requestFields.Request] === void 0 && (target[this._requestFields.Request] = {});
            target[this._requestFields.Response] === void 0 && (target[this._requestFields.Response] = {});
        }
        Object.keys(target).forEach((key) => {
            Tools.getTypeOf(target[key]) === Tools.EPrimitiveTypes.object && (this._restoreStructure(target[key]));
        });
    }
    _getMap() {
        let output = '\t/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n' +
            `\t* Injection: map of references\n` +
            '\t* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n';
        output += '\texport let ConvertedTypedEntitiesMap: {[key: string]: any} = {};\n';
        output += '\texport let ReferencesMap: {[key: string]: any} = {};\n';
        output += `\texport function init(){\n`;
        Object.keys(this._map).forEach((signature) => {
            output += `\t\tReferencesMap["${signature}"] = ${this._map[signature]};\n`;
        });
        output += `\t\tConvertedTypedEntitiesMap = convertTypesToStandard(TypedEntitiesMap);\n`;
        output += `\t}\n`;
        return output;
    }
    _getProtocolSignature() {
        let signature = this._version;
        Object.keys(this._map).forEach((entitySignature) => {
            signature += entitySignature;
        });
        signature = Tools.hash(signature, true);
        let output = '\t/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n' +
            `\t* Injection: protocol signature\n` +
            '\t* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n';
        output += '\texport function getSignature() {\n';
        output += `\t\treturn "${signature}";\n`;
        output += `\t}\n`;
        return output;
    }
    _getInitialization() {
        let output = '/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n' +
            `* Injection: initialization\n` +
            '* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n';
        output += 'Protocol.init();\n';
        return output;
    }
    _getGlobalExport() {
        let output = '/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n' +
            `* Injection: export from Protocol namespace\n` +
            '* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n';
        output += 'export type TProtocolTypes = Protocol.TTypes;\n';
        output += 'export const parse = Protocol.parse;\n';
        output += 'export const parseFrom = Protocol.parseFrom;\n';
        output += 'export const stringify = Protocol.stringify;\n';
        output += 'export const join = Protocol.Packager.join;\n';
        output += 'export const split = Protocol.Packager.split;\n';
        output += 'export const isPackage = Protocol.Packager.isPackage;\n';
        output += 'export const getSignature = Protocol.getSignature;\n';
        output += 'export interface IClass { getSignature: () => string; parse: (str: string | object) => any; }\n';
        output += 'export interface IImplementation { getSignature: () => string; stringify: () => string | Uint8Array; }\n';
        return output;
    }
    _getTypes() {
        let output = '\t/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n' +
            `\t* Injection: map of types\n` +
            '\t* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n';
        output += '\texport type TTypes = \n';
        const count = Object.keys(this._map).length;
        Object.keys(this._map).forEach((signature, index) => {
            output += `\t\t${this._map[signature]}${index !== count - 1 ? ' |' : ';'}\n`;
        });
        return output;
    }
    _getEntities(parent, target) {
        // Check name conflicts
        Object.keys(target).forEach((prop) => {
            const name = this._entityType.serializeName(prop);
            if (name === parent.name) {
                throw new Error(this._logger.error(`Parent enitity "${parent.name}" has nested definition with name "${prop}". Use other name for nested definition.`));
            }
        });
        // Proceed entities walking
        Object.keys(target).forEach((prop) => {
            const value = target[prop];
            const type = this._entityType.getType(prop, value);
            if (type instanceof Array) {
                throw new Error(this._logger.error(`Error converting: \n ${type.map((error) => error.message).join('\n')}`));
            }
            if (parent.children[prop] !== void 0) {
                throw new Error(this._logger.error(`Prop "${prop}" is defined twice.`));
            }
            parent.children[prop] = {
                children: {},
                name: this._entityType.serializeName(prop),
                parent: parent,
                request: this._isTargetRequest(value),
                single: this._entityType.isSingle(prop),
                type: type,
                value: value,
            };
            switch (type) {
                case protocol_entity_1.EEntityType.class:
                case protocol_entity_1.EEntityType.complex:
                case protocol_entity_1.EEntityType.namespace:
                    this._getEntities(parent.children[prop], target[prop]);
                    break;
                case protocol_entity_1.EEntityType.enum:
                case protocol_entity_1.EEntityType.primitive:
                case protocol_entity_1.EEntityType.reference:
                    break;
            }
        });
    }
    _validateEntities(entity) {
        Object.keys(entity.children).forEach((prop) => {
            const target = entity.children[prop];
            const ref = target.value;
            if (entity.parent === null) {
                return this._validateEntities(target);
            }
            if (entity.request && entity.children.Responses !== void 0) {
                if (!(entity.children.Responses.value instanceof Array)) {
                    throw new Error(`Field "Responses" is reserved. Value can be only string[]. Check prop "${entity.name}".`);
                }
                entity.children.Responses.value.forEach((childRef) => {
                    const childRefImpl = this._findRefImpl(entity, childRef);
                    if (childRefImpl === '') {
                        throw new Error(this._logger.error(`Cannot find definition for "${childRef}". Define "${childRef}" on root level or on parent levels of "${entity.name}".`));
                    }
                });
            }
            if (target.type !== protocol_entity_1.EEntityType.reference) {
                return this._validateEntities(target);
            }
            // Check reference implementation
            const refImpl = this._findRefImpl(entity, ref);
            if (refImpl === '') {
                throw new Error(this._logger.error(`Cannot find definition for "${ref}". Define "${ref}" on root level or on parent levels of "${entity.name}".`));
            }
            this._validateEntities(target);
        });
    }
    _findEntityWithRefImpl(entity, ref) {
        const _ref = `@${ref}`;
        if (entity.children[ref] === void 0 && entity.children[_ref] === void 0) {
            if (entity.parent !== null) {
                return this._findEntityWithRefImpl(entity.parent, ref);
            }
            return undefined;
        }
        return entity;
    }
    _findEntityByPath(path) {
        const parts = path.split('.');
        let entity = this._entities.root;
        parts.forEach((part) => {
            if (entity === undefined || entity.children === void 0 || (entity.children[part] === void 0 && entity.children[`@${part}`] === void 0)) {
                entity = undefined;
                return;
            }
            entity = entity.children[part] !== void 0 ? entity.children[part] : entity.children[`@${part}`];
        });
        return entity;
    }
    _getPathToRef(parent, path = []) {
        parent.type !== protocol_entity_1.EEntityType.root && path.unshift(parent.name);
        if (parent.parent !== null) {
            this._getPathToRef(parent.parent, path);
        }
        return path.join('.');
    }
    _findRefImpl(parent, ref) {
        const entity = this._findEntityWithRefImpl(parent, ref);
        if (entity === undefined) {
            return '';
        }
        if (entity.type === protocol_entity_1.EEntityType.root) {
            // Implementation of reference on root level - don't need full path
            return ref;
        }
        const path = this._getPathToRef(entity);
        return path === '' ? ref : `${path}.${ref}`;
    }
    _getClassConstructor(entity, deep = 0) {
        const tab = '\t'.repeat(deep);
        const nested = '\t'.repeat(deep + 1);
        let output = '';
        const ownArgs = this._getOwnArguments(entity);
        const parentArgs = entity.parent !== null ? (!entity.single ? this._getParentsArguments(entity.parent) : []) : [];
        const args = [];
        args.push(...parentArgs);
        args.push(...ownArgs);
        // Check conflicts
        ownArgs.forEach((ownArg) => {
            parentArgs.forEach((parentArg) => {
                if (ownArg.name === parentArg.name) {
                    throw new Error(`Conflict. Property "${entity.name}" has definition for "${ownArg.name}", but this field is already defined on parent's level.`);
                }
            });
        });
        // Build class
        if (args.length === 0) {
            output += `\n${tab}constructor() {`;
        }
        else {
            output += `\n${tab}constructor(args: { ${args.map((arg) => `${arg.name + (arg.optional ? '?' : '')}: ${arg.tsType}`).join(', ')} }) {`;
        }
        if (parentArgs.length > 0) {
            output += `\n${nested}super(Object.assign(args, {}));`;
        }
        else {
            output += `\n${nested}super();`;
        }
        ownArgs.forEach((arg) => {
            if (arg.optional) {
                output += `\n${nested}args.${arg.name} !== void 0 && (this.${arg.name} = args.${arg.name});`;
            }
            else {
                output += `\n${nested}this.${arg.name} = args.${arg.name};`;
            }
        });
        output += `\n`;
        if (args.length > 0) {
            output += `${nested}const errors: Error[] = Protocol.validateParams(args, ${entity.name});\n`;
            output += `${nested}if (errors.length > 0) {\n`;
            output += `${nested}\tthrow new Error(\`Cannot create class of "${entity.name}" due error(s):\\n\${errors.map((error: Error) => { return \`\\t- \${error.message}\`; }).join('\\n')}\`);\n`;
            output += `${nested}}\n`;
        }
        output += `\n${tab}}\n`;
        return output;
    }
    _getOwnArguments(entity) {
        const args = [];
        Object.keys(entity.children).forEach((key) => {
            const target = entity.children[key];
            switch (target.type) {
                case protocol_entity_1.EEntityType.primitive:
                    const type = this._entityType.getTypes()[target.value];
                    args.push({
                        name: target.name.replace(/\?/gi, ''),
                        optional: target.name.indexOf('?') !== -1,
                        protoType: target.value,
                        tsType: this._entityType.getTypes()[target.value].tsType,
                        type: target.type,
                    });
                    break;
                case protocol_entity_1.EEntityType.reference:
                    args.push({
                        name: target.name.replace(/\?/gi, ''),
                        optional: target.name.indexOf('?') !== -1,
                        protoType: target.value,
                        tsType: this._findRefImpl(target.parent, target.value),
                        type: target.type,
                    });
                    break;
                case protocol_entity_1.EEntityType.repeated:
                    const typeAlias = this._entityType.getRepeatedType(target.value);
                    let tsType = '';
                    if (this._entityType.isPrimitive(typeAlias)) {
                        tsType = this._entityType.getTypes()[typeAlias].tsType;
                    }
                    else {
                        tsType = this._findRefImpl(target.parent, typeAlias);
                    }
                    args.push({
                        name: target.name.replace(/\?/gi, ''),
                        optional: target.name.indexOf('?') !== -1,
                        protoType: target.value,
                        tsType: `Array<${tsType}>`,
                        type: target.type,
                    });
                    break;
            }
        });
        return args;
    }
    _getParentsArguments(parent) {
        const args = [];
        switch (parent.type) {
            case protocol_entity_1.EEntityType.class:
            case protocol_entity_1.EEntityType.complex:
            case protocol_entity_1.EEntityType.namespace:
                args.push(...this._getOwnArguments(parent));
                parent.parent !== null && args.push(...this._getParentsArguments(parent.parent));
                break;
        }
        return args;
    }
    _getClassChain(entity) {
        const signature = entity.name;
        return (entity.parent !== null ? (entity.parent.type !== protocol_entity_1.EEntityType.root ? `${this._getClassChain(entity.parent)}.` : '') : '') + signature;
    }
    _getClassImplementation(entity, deep = 0) {
        let output = '';
        const tab = '\t'.repeat(deep);
        const exttab = '\t'.repeat(deep + 1);
        const extended = (entity.parent !== null ? (entity.parent.type !== protocol_entity_1.EEntityType.root ? ` extends ${entity.parent.name}` : ' extends Protocol.Root') : '');
        // Open class
        output += `${tab}export class ${entity.name}${entity.single ? ' extends Protocol.Root' : extended} {\n`;
        // Define signature
        const chain = this._getClassChain(entity);
        const signature = Tools.hash(`${this._version}:${chain}`, true);
        output += this._getDescriptionEntity(entity, deep + 1);
        output += `${exttab}static __signature: string = "${signature}";\n`;
        output += `${exttab}static getSignature(): string {\n`;
        output += `${exttab}\treturn ${entity.name}.__signature;\n`;
        output += `${exttab}}\n`;
        output += `${exttab}public __signature: string = ${entity.name}.__signature;\n`;
        output += `${exttab}public getSignature(): string {\n`;
        output += `${exttab}\treturn this.__signature;\n`;
        output += `${exttab}}\n`;
        // Define extractor
        output += `${exttab}static parse(str: string | object): Protocol.TTypes | Error {\n`;
        output += `${exttab}\treturn Protocol.parse(str, ${entity.name});\n`;
        output += `${exttab}}\n`;
        // Define stringify
        output += `${exttab}public stringify(): string {\n`;
        output += `${exttab}\treturn Protocol.stringify(this, ${entity.name}) as string;\n`;
        output += `${exttab}}\n`;
        // Save signature
        if (this._map[signature] !== void 0) {
            throw new Error(this._logger.error(`Signature (${signature}) for "${entity.name}" already exsist. Cannot continue converting.`));
        }
        this._map[signature] = chain;
        // Create keys map
        this._setKeysMap(entity, signature);
        // Create json/typed map
        this._setTypedMap(entity, signature);
        // Define properties
        Object.keys(entity.children).forEach((prop) => {
            const child = entity.children[prop];
            switch (child.type) {
                case protocol_entity_1.EEntityType.primitive:
                case protocol_entity_1.EEntityType.reference:
                case protocol_entity_1.EEntityType.repeated:
                    output += this._getImplementation(child, deep + 1);
                    break;
            }
        });
        // Add constructor
        output += this._getClassConstructor(entity, deep + 1);
        output += `${tab}}\n`;
        // Close class
        return output;
    }
    _getDescriptionEntity(entity, deep = 0) {
        const tab = '\t'.repeat(deep);
        const ownArgs = this._getOwnArguments(entity);
        const parentArgs = entity.parent !== null ? (!entity.single ? this._getParentsArguments(entity.parent) : []) : [];
        const args = [];
        args.push(...parentArgs);
        args.push(...ownArgs);
        let output = `${tab}static getDescription(): {[key: string]: Protocol.IProperty } {\n`;
        output += `${tab}\treturn {\n`;
        args.forEach((arg) => {
            const name = this._entityType.hardSerializeName(arg.name);
            switch (arg.type) {
                case protocol_entity_1.EEntityType.class:
                case protocol_entity_1.EEntityType.complex:
                case protocol_entity_1.EEntityType.namespace:
                case protocol_entity_1.EEntityType.reference:
                    output += `${tab}\t\t${name}: { name: "${name}", value: ${arg.tsType}, type: Protocol.EEntityType.${arg.type}, optional: ${arg.optional} }, \n`;
                    break;
                case protocol_entity_1.EEntityType.primitive:
                    output += `${tab}\t\t${name}: { name: "${name}", value: "${arg.protoType}", type: Protocol.EEntityType.${arg.type}, optional: ${arg.optional} }, \n`;
                    break;
                case protocol_entity_1.EEntityType.repeated:
                    let repeatedType = this._entityType.getRepeatedType(arg.protoType);
                    repeatedType = this._entityType.isPrimitive(repeatedType) ? `"${repeatedType}"` : this._entityType.getRepeatedType(arg.tsType);
                    output += `${tab}\t\t${name}: { name: "${name}", value: ${repeatedType}, type: Protocol.EEntityType.${arg.type}, optional: ${arg.optional} }, \n`;
                    break;
                case protocol_entity_1.EEntityType.enum:
                    break;
            }
        });
        output += `${tab}\t}\n`;
        output += `${tab}}\n`;
        return output;
    }
    _getTypedMap(target, deep = 1, signature) {
        let output = '';
        const tab = '\t'.repeat(deep);
        if (target === undefined) {
            output =
                `${tab}/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n` +
                    `${tab}* Injection: typed map\n` +
                    `${tab}* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n` +
                    `${tab}export const TypedEntitiesMap: {[key: string]: any} = {\n`;
            Object.keys(this._typedMap).forEach((signatureKey) => {
                const map = this._typedMap[signatureKey];
                output += `${tab}\t"${signatureKey}": {\n`;
                Object.keys(map).forEach((key) => {
                    let value = map[key];
                    if (typeof value === 'string') {
                        output += `${tab}\t\t${key}: "${value}",\n`;
                    }
                    else if (value instanceof Array && value.length === 1) {
                        value = value[0];
                        if (typeof value === 'string') {
                            output += `${tab}\t\t${key}: ["${value}"],\n`;
                        }
                        else if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
                            output += `${tab}\t\t${key}: [${this._getTypedMap(value, deep + 1, signatureKey)}],\n`;
                        }
                        else {
                            throw new Error(`Unsupported type is detected or incorrect structure. Check name: ${key} for signature ${signatureKey}.`);
                        }
                    }
                    else if (typeof value === 'object' && value !== null) {
                        output += `${tab}\t\t${key}: ${this._getTypedMap(value, deep + 1, signatureKey)},\n`;
                    }
                    else {
                        throw new Error(`Unsupported type is detected or incorrect structure. Check name: ${key} for signature ${signatureKey}.`);
                    }
                });
                output += `${tab}\t},\n`;
            });
            output += `${tab}};\n`;
        }
        else if (target !== undefined) {
            output = `{\n`;
            Object.keys(target).forEach((key) => {
                let value = target[key];
                if (typeof value === 'string') {
                    output += `${tab}\t\t${key}: "${value}",\n`;
                }
                else if (value instanceof Array && value.length === 1) {
                    value = value[0];
                    if (typeof value === 'string') {
                        output += `${tab}\t\t${key}: ["${value}"],\n`;
                    }
                    else if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
                        output += `${tab}\t\t${key}: [${this._getTypedMap(value, deep + 1, signature)}],\n`;
                    }
                    else {
                        throw new Error(`Unsupported type is detected or incorrect structure. Check name: ${key} for signature ${signature}.`);
                    }
                }
                else if (typeof value === 'object' && value !== null) {
                    output += `${tab}\t\t${key}: ${this._getTypedMap(value, deep + 1, signature)},\n`;
                }
                else {
                    throw new Error(`Unsupported type is detected or incorrect structure. Check name: ${key} for signature ${signature}.`);
                }
            });
            output += `${tab}\t}`;
        }
        return output;
    }
    _setTypedMap(entity, signature) {
        this._typedMap[signature] = this._getEntityTypedMap(entity);
    }
    _getEntityTypedMap(entity) {
        const chain = this._getClassChain(entity);
        const signature = Tools.hash(`${this._version}:${chain}`, true);
        const map = {};
        const ownArgs = this._getOwnArguments(entity);
        const parentArgs = entity.parent !== null ? (!entity.single ? this._getParentsArguments(entity.parent) : []) : [];
        const args = [];
        if (this._keysMapLeft[signature] === undefined) {
            this._setKeysMap(entity, signature);
        }
        const propsAliases = this._keysMapLeft[signature];
        if (propsAliases === undefined) {
            throw new Error(`Fail to find keys map for "${signature}"`);
        }
        args.push(...parentArgs);
        args.push(...ownArgs);
        args.forEach((arg) => {
            const name = this._entityType.hardSerializeName(arg.name);
            const nameAlias = propsAliases[name];
            let refEntity;
            switch (arg.type) {
                case protocol_entity_1.EEntityType.class:
                case protocol_entity_1.EEntityType.complex:
                case protocol_entity_1.EEntityType.namespace:
                case protocol_entity_1.EEntityType.reference:
                    refEntity = this._findEntityByPath(arg.tsType);
                    if (refEntity === undefined) {
                        refEntity = this._findEntityByPath(arg.tsType);
                        throw new Error(`[reference] Cannot find reference for "${name}". Reference: "${arg.tsType}"`);
                    }
                    if (refEntity.type === protocol_entity_1.EEntityType.enum) {
                        map[nameAlias] = 'string';
                    }
                    else {
                        map[nameAlias] = this._getEntityTypedMap(refEntity);
                    }
                    break;
                case protocol_entity_1.EEntityType.primitive:
                    map[nameAlias] = arg.protoType;
                    break;
                case protocol_entity_1.EEntityType.repeated:
                    let repeatedType = this._entityType.getRepeatedType(arg.protoType);
                    if (this._entityType.isPrimitive(repeatedType)) {
                        map[nameAlias] = [repeatedType];
                    }
                    else {
                        repeatedType = this._entityType.getRepeatedType(arg.tsType);
                        refEntity = this._findEntityByPath(repeatedType);
                        if (refEntity === undefined) {
                            throw new Error(`[repeated] Cannot find reference for "${name}". Reference: "${repeatedType}"`);
                        }
                        if (refEntity.type === protocol_entity_1.EEntityType.enum) {
                            map[nameAlias] = ['string'];
                        }
                        else {
                            map[nameAlias] = [this._getEntityTypedMap(refEntity)];
                        }
                    }
                    break;
                case protocol_entity_1.EEntityType.enum:
                    map[nameAlias] = ['string'];
                    break;
            }
        });
        return map;
    }
    _setKeysMap(entity, signature) {
        if (this._keysMapLeft[signature] !== undefined && this._keysMapRight[signature] !== undefined) {
            return;
        }
        const index = {
            l: 97,
            n: 0,
        };
        let cache = {};
        function next() {
            const key = `${String.fromCharCode(index.l)}${index.n === 0 ? '' : index.n}`;
            if (cache[String.fromCharCode(index.l)] === void 0) {
                cache[String.fromCharCode(index.l)] = true;
                return key;
            }
            if (index.l < 122 && index.l >= 97) {
                index.l += 1;
            }
            else if (index.l < 90 && index.l >= 65) {
                index.l += 1;
            }
            else if (index.l === 122) {
                index.n += 1;
                index.l = 65;
            }
            else if (index.l === 90) {
                index.l = 97;
            }
            return next();
        }
        const ownArgs = this._getOwnArguments(entity);
        const parentArgs = entity.parent !== null ? (!entity.single ? this._getParentsArguments(entity.parent) : []) : [];
        const args = [];
        args.push(...parentArgs);
        args.push(...ownArgs);
        const keyMapLeft = {};
        const keyMapRight = {};
        args.forEach((arg) => {
            const name = this._entityType.hardSerializeName(arg.name);
            switch (arg.type) {
                case protocol_entity_1.EEntityType.class:
                case protocol_entity_1.EEntityType.complex:
                case protocol_entity_1.EEntityType.namespace:
                case protocol_entity_1.EEntityType.reference:
                case protocol_entity_1.EEntityType.primitive:
                case protocol_entity_1.EEntityType.repeated:
                    keyMapLeft[name] = next();
                    keyMapRight[keyMapLeft[name]] = name;
                    break;
                case protocol_entity_1.EEntityType.enum:
                    break;
            }
        });
        cache = null;
        this._keysMapLeft[signature] === undefined && (this._keysMapLeft[signature] = keyMapLeft);
        this._keysMapRight[signature] === undefined && (this._keysMapRight[signature] = keyMapRight);
    }
    _getKeysMaps() {
        let output = '\t/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n' +
            `\t* Injection: map of types\n` +
            '\t* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */\n';
        output += '\texport const KeysMapLeft: {[key: string]: any} = {\n';
        Object.keys(this._keysMapLeft).forEach((signature) => {
            const map = this._keysMapLeft[signature];
            output += `\t\t"${signature}": {\n`;
            Object.keys(map).forEach((key) => {
                output += `\t\t\t${key}: "${map[key]}",\n`;
            });
            output += `\t\t},\n`;
        });
        output += '\t};\n';
        output += '\texport const KeysMapRight: {[key: string]: any} = {\n';
        Object.keys(this._keysMapLeft).forEach((signature) => {
            const map = this._keysMapLeft[signature];
            output += `\t\t"${signature}": {\n`;
            Object.keys(map).forEach((key) => {
                output += `\t\t\t${map[key]}: "${key}",\n`;
            });
            output += `\t\t},\n`;
        });
        output += '\t};';
        return output;
    }
    _getImplementation(entity, deep = 0) {
        let output = '';
        const tab = '\t'.repeat(deep);
        const exttab = '\t'.repeat(deep + 1);
        switch (entity.type) {
            case protocol_entity_1.EEntityType.root:
                Object.keys(entity.children).forEach((prop) => {
                    const child = entity.children[prop];
                    output += this._getImplementation(child, deep);
                });
                break;
            case protocol_entity_1.EEntityType.class:
                // Open class
                output += this._getClassImplementation(entity, deep);
                // Close class
                break;
            case protocol_entity_1.EEntityType.complex:
                // Open class
                output += this._getClassImplementation(entity, deep);
                // Close class
                // Open namespace
                output += `${tab}export namespace ${entity.name} {\n`;
                Object.keys(entity.children).forEach((prop) => {
                    const child = entity.children[prop];
                    if (child.type === protocol_entity_1.EEntityType.enum) {
                        output += this._getImplementation(child, deep + 1);
                    }
                });
                // Close namespace
                output += `${tab}}\n`;
                break;
            case protocol_entity_1.EEntityType.namespace:
                // Open class
                output += this._getClassImplementation(entity, deep);
                // Close class
                // Open namespace
                output += `${tab}export namespace ${entity.name} {\n`;
                Object.keys(entity.children).forEach((prop) => {
                    const child = entity.children[prop];
                    if (child.type !== protocol_entity_1.EEntityType.primitive && child.type !== protocol_entity_1.EEntityType.reference && child.type !== protocol_entity_1.EEntityType.repeated) {
                        output += this._getImplementation(child, deep + 1);
                    }
                });
                if (entity.request) {
                    // Add type description for request
                    const responses = ['Response'];
                    entity.children.Responses !== void 0 && responses.push(...entity.children.Responses.value);
                    output += `${exttab}type TResponses = ${responses.join(' | ')};\n`;
                }
                // Close namespace
                output += `${tab}}\n`;
                break;
            case protocol_entity_1.EEntityType.primitive:
                const type = this._entityType.getTypes()[entity.value];
                output += `${tab}public ${entity.name}: ${type.tsType} = ${type.init};\n`;
                break;
            case protocol_entity_1.EEntityType.reference:
                output += `${tab}public ${entity.name}: ${this._findRefImpl(entity.parent, entity.value)};\n`;
                break;
            case protocol_entity_1.EEntityType.repeated:
                const typeAlias = this._entityType.getRepeatedType(entity.value);
                let tsType = '';
                if (this._entityType.isPrimitive(typeAlias)) {
                    tsType = this._entityType.getTypes()[typeAlias].tsType;
                }
                else {
                    tsType = this._findRefImpl(entity.parent, typeAlias);
                }
                output += `${tab}public ${entity.name}: Array<${tsType}> = [];\n`;
                break;
            case protocol_entity_1.EEntityType.enum:
                output += `${tab}export enum ${entity.name} {\n`;
                entity.value.forEach((value, index) => {
                    output += `${tab}\t${value} = '${value}'${index < entity.value.length - 1 ? ',' : ''}\n`;
                });
                output += `${tab}}\n`;
                break;
        }
        return output;
    }
}
exports.Convertor = Convertor;
//# sourceMappingURL=protocol.convertor.js.map