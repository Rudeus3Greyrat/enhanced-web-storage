import { throwErrorMessage, hasStringify } from './util.js';

class CustomStorage {

    constructor() {
        if (!window) {
            throwErrorMessage('当前环境非浏览器，无法消费全局window实例。')
        }
        if (!window.localStorage) {
            throwErrorMessage('当前环境非无法使用localStorage')
        }
        if (!window.sessionStorage) {
            throwErrorMessage('当前环境非无法使用sessionStorage')
        }
        this.readStorage = window.localStorage;
    }

    /**
     * 初始化Storage的数据
     * @param config StorageBootStrapConfig
     */
    bootStrap(config) {
        switch (config.mode) {
            case 'session':
                this.readStorage = window.sessionStorage;
                break;
            case 'local':
                this.readStorage = window.localStorage;
                break;
            default:
                throwErrorMessage('当前配置的mode不符合要求，请再次检查传入的配置。');
                break;
        }
        this.config = config;
    }

    /**
     * 获取所有key
     * @returns string[]
     */
    getKeys() {
        return Object.keys(this.readStorage);
    }

    /**
     * 获取所有value
     * @returns any[] 所有数据集合
     */
    getValues() {
        return Object.values(this.readStorage);
    }

    /**
     * 返回当前存储库大小
     * @returns number
     */
    size() {
        return this.readStorage.length;
    }

    /**
     * 返回当前存储库是否含有参数key
     * @returns boolean
     */
    hasItem(key) {
        return this.readStorage.hasOwnProperty(key);
    }

    /**
     *
     * @param key 设置当前存储key
     * @param value 设置当前存储value
     */
    setItem(key, value) {
        if (hasStringify(value)) {
            const saveData = {
                timestamp: new Date().getTime(),
                data: value
            };
            console.log(saveData, 'saveData');
            this.readStorage.setItem(key, JSON.stringify(saveData));
        }
        else {
            throwErrorMessage('需要存储的data不支持JSON.stringify方法，请检查当前数据');
        }
    }

    /**
     * 获取数据
     * @param key 获取当前数据key
     * @returns 存储数据
     */
    getItem(key) {
        const content = JSON.parse(this.readStorage.getItem(key));
        if ((content === null || content === void 0 ? void 0 : content.timestamp) && new Date().getTime() - content.timestamp >= this.config.timeout) {
            this.removeItem(key);
            return null;
        }
        return (content === null || content === void 0 ? void 0 : content.data) || null;
    }

    /**
     * 移除一条数据
     * @param key 移除key
     */
    removeItem(key) {
        if (this.hasItem(key)) {
            this.readStorage.removeItem(key);
        }
    }

    /**
     * 通过给定回调，改变当前数据key对应的值
     * @param key 需要改变的key
     * @param onChange 回调函数
     * @param baseValue 传入的默认参数(若未存储该key值或者已经过期)
     */
    changeItem(key, onChange, baseValue) {
        const data = this.getItem(key);
        this.setItem(key, onChange(data || baseValue));
    }

    /**
     * 清楚全部存储
     */
    clearAll() {
        this.readStorage.clear();
    }
}
/**
 * 实例化当前Storage下的class
 */
export default CustomStorage;